//declare variables
const powerSwitch = document.querySelector("#power");
const bankSwitch = document.querySelector("#bank");
const volume = document.querySelector("#volume-range");
const display = document.querySelector("#display");
const keypads = document.querySelector(".keypads");

//bank 1
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];
//bank 2
const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];
//reset display to show bank title
function setTimeOut() {
  setTimeout(() => {
    if (bankSwitch.style.flexDirection !== "row-reverse") {
      display.innerText = "Heater Kit";
    } else {
      display.innerText = "Smooth Piano Kit";
    }
  }, 2000);
}

//toggle power
powerSwitch.addEventListener("click", () => {
  if (powerSwitch.style.flexDirection !== "row-reverse") {
    powerSwitch.style.flexDirection = "row-reverse";
    display.innerText = "Power ON";
    setTimeOut();
  } else {
    powerSwitch.style.flexDirection = "row";
    display.innerText = "Power OFF";
    setTimeOut();
  }
});
//toogle bank
bankSwitch.addEventListener("click", () => {
  if (bankSwitch.style.flexDirection !== "row-reverse") {
    bankSwitch.style.flexDirection = "row-reverse";
    display.innerText = "Smooth Piano Kit";
  } else {
    bankSwitch.style.flexDirection = "row";
    display.innerText = "Heater Kit";
  }
});

//volume control
// volume.addEventListener("change", (e) => {
//   display.innerHTML = `Volume ${Math.floor(e.target.value * 100)}`;
//   volume.setAttribute("value", e.target.value);
//   setTimeOut();
// });
function showVolume(value) {
  display.innerText = `Volume ${value}`;
  setTimeOut();
}
function playAudio(key) {
  if (
    bankSwitch.style.flexDirection !== "row-reverse" &&
    powerSwitch.style.flexDirection == "row-reverse"
  )
    playSelectedBankAudio(bankOne, key);
  else {
    if (powerSwitch.style.flexDirection == "row-reverse")
      playSelectedBankAudio(bankTwo, key);
  }
}
function playSelectedBankAudio(bank, key) {
  let keyPressed = bank.filter((item) => item.keyTrigger == key);
  display.innerHTML = `${keyPressed[0].id}`;
  let audio = new Audio(keyPressed[0].url);
  audio.play();
  audio.volume = volume.value;
}

//getting all the keypads
keypads.addEventListener("click", (e) => {
  playAudio(e.target.innerText);
  if (powerSwitch.style.flexDirection !== "row-reverse") {
    display.innerText = "Turn Power ON";
    setTimeOut();
  }
  if (powerSwitch.style.flexDirection == "row-reverse" && volume.value == 0) {
    display.innerText = "Increase volume";
    setTimeOut();
  }
});

//adding keyboard support
document.addEventListener("keypress", (e) => {
  switch (e.key.toUpperCase()) {
    case "Q":
    case "W":
    case "E":
    case "A":
    case "S":
    case "D":
    case "Z":
    case "X":
    case "C":
      playAudio(e.key.toUpperCase());
      break;
    default:
      break;
  }
});
