const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

/* Reverse the morseCode dictionary to get a 
lookup for Morse code to letters and numbers */
const reverseMorseCode = {};
for (const key in morseCode) {
  if (morseCode.hasOwnProperty(key)) {
    const value = morseCode[key];
    reverseMorseCode[value] = key;
  }
}

const inputField = document.getElementById("input");
const translateBtn = document.getElementById("translate-btn");
const outputField = document.getElementById("translate-res");
const playBtn = document.getElementById("play-btn");

document.addEventListener("DOMContentLoaded", function () {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = null;
  let gainNode = null;

  /**
   * Function to start sound modulation.
   */
  function startTone() {
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
  }

  /**
   * Function to stop sound modulation.
   */
  function stopTone() {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
      oscillator = null;
      gainNode = null;
    }
  }

  /**
   * Function to play dot symbol of the Morse code (0.1 sec of tone).
   */
  function playDot() {
    startTone();
    setTimeout(stopTone, 100);
  }

  /**
   * Function to play dash symbol of the Morse code (0.3 sec of tone).
   */
  function playDash() {
    startTone();
    setTimeout(stopTone, 300);
  }

  /**
   * Function to play pause between letters.
   * @returns promise of 0.6 sec. timeout
   */
  function playPause() {
    return new Promise((resolve) => setTimeout(resolve, 600));
  }

  /**
   * Function to play pause between words.
   * @returns promise of 1.8 sec. timeout
   */
  function playSlash() {
    return new Promise((resolve) => setTimeout(resolve, 1800));
  }

  /**
   * Play button "click" event listener.
   */
  playBtn.addEventListener("click", async function () {
    playBtn.disabled = true;
    const textResult = outputField.textContent;
    for (let i = 0; i < textResult.length; i++) {
      switch (textResult[i]) {
        case ".":
          playDot();
          break;
        case "-":
          playDash();
          break;
        case " ":
          await playPause();
          break;
        case "/":
          await playSlash();
          break;
        default:
          console.log(`Неизвестный символ: ${textResult[i]}`);
      }
      // Пауза между символами
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    playBtn.disabled = false;
  });
});

/**
 * Listener for "click" events of the translate button.
 */
translateBtn.addEventListener("click", () => {
  // parse input
  const inputText = inputField.value.trim().toUpperCase();
  if (inputText === "") {
    outputField.style.color = "#D21404";
    outputField.textContent = "no input provided";
    return;
  }
  outputField.style.color = "#08283d";

  if (inputText.includes(".")) {
    /* the input contains dots, it is assumed to be 
  Morse code and should be translated */
    playBtn.disabled = true;
    const morseWords = inputText.split("/");
    const translatedWords = morseWords.map((morseWord) => {
      const morseChars = morseWord.split(" ");
      return morseChars
        .map((morseChar) => {
          return reverseMorseCode[morseChar] || morseChar;
        })
        .join("");
    });
    outputField.textContent = translatedWords.join(" ");
  } else {
    /* the input is text and should be translated 
   to Morse code */
    const textWords = inputText.split(" ");
    const translatedWords = textWords.map((textWord) => {
      const textChars = textWord.split("");
      const morseChars = textChars.map((textChar) => {
        return morseCode[textChar] || textChar;
      });
      return morseChars.join(" ");
    });
    outputField.textContent = translatedWords.join("/");
    playBtn.disabled = false;
  }
});
