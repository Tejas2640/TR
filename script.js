const music = document.getElementById("bgMusic");

/* SECTION CONTROL */
const sections = document.querySelectorAll(".section");
function show(id) {
  sections.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* QUESTIONS */
const questions = [
  "Do you know how special you are to me? ❤️",
  "Will you always stay with me? 💕",
  "Can I love you forever? 😘",
  "Ready for something magical? ✨"
];

let q = 0;
const qText = document.getElementById("questionText");
const yesQ = document.getElementById("yesQ");
const noQ = document.getElementById("noQ");
const yesMsg = document.getElementById("yesMsg");
const noMsg = document.getElementById("noMsg");

qText.innerText = questions[q];

yesQ.onclick = () => {
  music.play();
  yesMsg.style.display = "block";
  noMsg.style.display = "none";

  setTimeout(() => {
    yesMsg.style.display = "none";
    q++;
    if (q < questions.length) {
      qText.innerText = questions[q];
    } else {
      show("proposalSection");
    }
  }, 1200);
};

noQ.onclick = () => {
  noMsg.style.display = "block";
  noQ.style.position = "absolute";
  noQ.style.left = Math.random() * 80 + "%";
  noQ.style.top = Math.random() * 80 + "%";
};

/* PROPOSAL */
const noFinal = document.getElementById("noFinal");

setInterval(() => {
  if (document.getElementById("proposalSection").classList.contains("active")) {
    noFinal.style.transform =
      `translate(${Math.random() * 200}px, ${Math.random() * 120}px)`;
  }
}, 200);

document.getElementById("yesFinal").onclick = () => {
  show("letterSection");
};

/* LETTER → MATCH GAME */
document.getElementById("toMatch").onclick = () => {
  show("matchSection");
  startMatch();
};

/* MATCH GAME */
const emojis = ["❤️","❤️","💖","💖","💕","💕","💘","💘"];
let first = null;
let lock = false;
let matched = 0;

function startMatch() {
  const board = document.getElementById("matchBoard");
  board.innerHTML = "";
  matched = 0;
  first = null;
  lock = false;

  [...emojis].sort(() => Math.random() - 0.5).forEach(e => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => flip(card, e);
    board.appendChild(card);
  });
}

function flip(card, emoji) {
  if (lock || card.innerText) return;

  card.innerText = emoji;

  if (!first) {
    first = { card, emoji };
  } else {
    lock = true;

    if (first.emoji === emoji) {
      matched += 2;
      first = null;
      lock = false;

      if (matched === emojis.length) {
        setTimeout(() => {
          show("finalSection"); // ❤️ DIRECT TO FINAL PARAGRAPH
        }, 800);
      }
    } else {
      setTimeout(() => {
        card.innerText = "";
        first.card.innerText = "";
        first = null;
        lock = false;
      }, 800);
    }
  }
}
