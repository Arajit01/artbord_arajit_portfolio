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
// Initial Values
let date = new Date();
let selectedDate = "";
const email = "arajithalder123@gmail.com"; // ← CHANGE TO YOUR EMAIL

const monthYearLabel = document.getElementById("calendar-month-year");
const calendarGrid = document.getElementById("calendar-grid");
const selectedDateBox = document.getElementById("selected-date");

// Render Calendar
function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYearLabel.textContent = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });

    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Blank cells before month start
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement("div");
        cell.classList.add("disabled");
        calendarGrid.appendChild(cell);
    }

    // Actual days
    for (let day = 1; day <= lastDate; day++) {
        const cell = document.createElement("div");
        cell.textContent = day;

        cell.addEventListener("click", () => {
            selectedDate = `${day} ${date.toLocaleString("en-US", { month: "long" })} ${year}`;
            selectedDateBox.textContent = selectedDate;

            document.querySelectorAll(".calendar-grid div").forEach(c => c.classList.remove("active"));
            cell.classList.add("active");
        });

        calendarGrid.appendChild(cell);
    }
}

// Month Navigation
document.getElementById("prevMonth").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// Email Booking System
document.getElementById("sendMail").addEventListener("click", () => {
    const time = document.getElementById("time-slot").value;

    if (!selectedDate || !time) {
        alert("Please select a date and time!");
        return;
    }

    const subject = `New Booking Request - ${selectedDate} at ${time}`;
    const body = `Hello Arajit,%0D%0A%0D%0AI want to book:%0D%0A%0D%0ADate: ${selectedDate}%0D%0ATime: ${time}%0D%0A%0D%0AThank you!`;

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

// First Load
renderCalendar();
