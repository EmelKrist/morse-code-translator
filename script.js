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
  }
});
