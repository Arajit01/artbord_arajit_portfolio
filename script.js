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

function getNextAvailability() {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(0, 0, 0, 0);
    return target;
}

let targetDate = getNextAvailability();

function updateCountdown() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance <= 0) {
        targetDate = getNextAvailability();
        distance = targetDate - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* =============================
   CALENDAR LOGIC
============================= */
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = "";

const monthEl = document.getElementById("month-name");
const yearEl = document.getElementById("year-number");
const daysEl = document.getElementById("calendar-days");

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function generateCalendar(month, year) {
    monthEl.textContent = MONTHS[month];
    yearEl.textContent = year;

    daysEl.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        daysEl.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
        const div = document.createElement("div");
        div.textContent = d;

        div.addEventListener("click", () => {
            document.querySelectorAll(".days div").forEach(a => a.classList.remove("selected"));
            div.classList.add("selected");

            selectedDate = `${d} ${MONTHS[month]} ${year}`;
        });

        daysEl.appendChild(div);
    }
}

generateCalendar(currentMonth, currentYear);

/* Month buttons */
document.getElementById("prevMonth").onclick = () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    generateCalendar(currentMonth, currentYear);
};

document.getElementById("nextMonth").onclick = () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    generateCalendar(currentMonth, currentYear);
};


/* =============================
   BOOKING + EMAIL
============================= */
document.getElementById("book-btn").onclick = () => {
    const time = document.getElementById("time-slot").value;

    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }
    if (!time) {
        alert("Please select a time.");
        return;
    }

    const email = "arajithalder123@gmail.com";  // change to your email

    const subject = encodeURIComponent("New Booking Request");
    const body = encodeURIComponent(
        `Hello Arajit,\n\nSomeone booked a slot.\n\nDate: ${selectedDate}\nTime: ${time}\n\nRegards,\nYour Portfolio Website`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};



