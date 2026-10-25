/* Password is intentionally exactly as requested. Note: a front-end password is a visual gate, not strong security. */
const SITE_PASSWORD = "TIME";


const gate = document.getElementById("gate");
const siteContent = document.getElementById("site-content");
const unlockForm = document.getElementById("unlock-form");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const noteImage = document.getElementById("short-note-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const openPhotoButton = document.getElementById("open-photo");
const closeLightboxButton = document.getElementById("close-lightbox");

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value.trim() === SITE_PASSWORD) {
    gate.hidden = true;
    siteContent.hidden = false;
    passwordError.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Keep the birthday heading unfocused so no automatic outline appears.
    updateClock();
    launchConfetti();
  } else {
    passwordError.textContent = "Hint: The thing I ask you everytime 😉. It has four letters and use all caps.";
    passwordInput.select();
  }
});

// A small, one-time confetti sprinkle on successful entry; no libraries needed.
function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const colors = ["#d4a6a0", "#e4bbb3", "#b8c5d6", "#f1e5d9", "#a97978"];
  const pieces = 44;

  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${5 + Math.random() * 4}px`;
    piece.style.height = `${7 + Math.random() * 6}px`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.55 ? "50%" : "2px";
    piece.style.setProperty("--confetti-drift", `${Math.round((Math.random() - 0.5) * 180)}px`);
    piece.style.setProperty("--confetti-rotation", `${Math.round(Math.random() * 900 - 450)}deg`);
    piece.style.setProperty("--confetti-duration", `${2.1 + Math.random() * 1.2}s`);
    piece.style.setProperty("--confetti-delay", `${Math.random() * 0.28}s`);
    layer.appendChild(piece);
  }

  window.setTimeout(() => layer.remove(), 4200);
}

function openLightbox() {
  lightboxImage.src = noteImage.currentSrc || noteImage.src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeLightboxButton.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  openPhotoButton.focus();
}
noteImage.addEventListener("click", openLightbox);
openPhotoButton.addEventListener("click", openLightbox);
closeLightboxButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// Draw fine minute marks and larger hour marks on the clock face.
const svgNS = "http://www.w3.org/2000/svg";
const tickGroup = document.getElementById("watch-ticks");
for (let i = 0; i < 60; i += 1) {
  const isHour = i % 5 === 0;
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", "130");
  line.setAttribute("x2", "130");
  line.setAttribute("y1", isHour ? "18" : "20");
  line.setAttribute("y2", isHour ? "31" : "25");
  line.setAttribute("transform", `rotate(${i * 6} 130 130)`);
  line.setAttribute("class", isHour ? "watch-tick major" : "watch-tick");
  line.setAttribute("stroke-width", isHour ? "2" : "1");
  tickGroup.appendChild(line);
}

const hourHand = document.getElementById("hour-hand-group");
const minuteHand = document.getElementById("minute-hand-group");
const secondHand = document.getElementById("second-hand-group");
const digitalClock = document.getElementById("digital-clock");
const clockDate = document.getElementById("clock-date");
const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
const dateFormatter = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" });

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  hourHand.setAttribute("transform", `rotate(${hours * 30} 130 130)`);
  minuteHand.setAttribute("transform", `rotate(${minutes * 6} 130 130)`);
  // A subtle tick rather than a continuous sweep keeps the clock calm and easy to read.
  secondHand.setAttribute("transform", `rotate(${Math.floor(seconds) * 6} 130 130)`);
  digitalClock.textContent = timeFormatter.format(now);
  clockDate.textContent = dateFormatter.format(now);
}
updateClock();
setInterval(updateClock, 250);
