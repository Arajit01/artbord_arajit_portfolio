// script.js — basic interactions
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // contact form (fake send)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent — I will reply soon!';
      form.reset();
      setTimeout(()=>status.textContent = '', 3500);
    }, 900);
  });
});

/* ============================================================
   FUTURISTIC COUNTDOWN TIMER (AUTO — 7 DAYS AHEAD)
   ============================================================ */

// Function to set next availability (7 days from today)
function getNextAvailability() {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(0, 0, 0, 0); // Reset time
    return target;
}

let targetDate = getNextAvailability();

function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    // If countdown ends → reset to next 7 days
    if (distance <= 0) {
        targetDate = getNextAvailability();
        distance = targetDate - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update UI
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

// Start countdown instantly + update every second
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   (OPTIONAL) EXTRA UI INTERACTIONS
   ============================================================ */

// Add hover glow pulse to boxes
document.querySelectorAll(".count-box").forEach(box => {
    box.addEventListener("mouseenter", () => {
        box.style.transform = "scale(1.10)";
    });
    box.addEventListener("mouseleave", () => {
        box.style.transform = "scale(1)";
    });
});
