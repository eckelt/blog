/**
 * "Read aloud" control for blog posts, built on the native Web Speech API.
 * No network calls, no dependencies — just SpeechSynthesis in the browser.
 */

function extractText(root: Element): string {
  const clone = root.cloneNode(true) as HTMLElement;
  // Tables and code blocks read poorly out loud, so they're skipped.
  clone.querySelectorAll("table, pre, .table-scroll").forEach((el) => el.remove());
  return (clone.textContent ?? "").replace(/\s+/g, " ").trim();
}

function pickGermanVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang === "de-DE") ?? voices.find((v) => v.lang.startsWith("de"));
}

export default function initSpeech() {
  if (!("speechSynthesis" in window)) return;

  const article = document.querySelector(".prose");
  const toggleBtn = document.querySelector<HTMLButtonElement>("#speech-toggle");
  const stopBtn = document.querySelector<HTMLButtonElement>("#speech-stop");
  if (!article || !toggleBtn || !stopBtn) return;

  const synth = window.speechSynthesis;
  let utterance: SpeechSynthesisUtterance | null = null;

  function updateUI() {
    if (synth.speaking && !synth.paused) {
      toggleBtn.textContent = "⏸ Pause";
    } else if (synth.paused) {
      toggleBtn.textContent = "▶ Weiter";
    } else {
      toggleBtn.textContent = "🔊 Vorlesen";
    }
    stopBtn.hidden = !(synth.speaking || synth.paused);
  }

  toggleBtn.hidden = false;
  updateUI();

  toggleBtn.addEventListener("click", () => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
    } else if (synth.paused) {
      synth.resume();
    } else {
      const text = extractText(article);
      if (!text) return;
      utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      const voice = pickGermanVoice();
      if (voice) utterance.voice = voice;
      utterance.onend = updateUI;
      utterance.onerror = updateUI;
      synth.cancel();
      synth.speak(utterance);
    }
    updateUI();
  });

  stopBtn.addEventListener("click", () => {
    synth.cancel();
    updateUI();
  });

  window.addEventListener("pagehide", () => synth.cancel());
}
