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

// Simple dynamic calendar generator
const calendar = document.getElementById("calendar");
let selectedDay = null;

function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = "";

    // Empty spaces before day 1
    for (let i = 0; i < firstDay; i++) {
        let blank = document.createElement("div");
        calendar.appendChild(blank);
    }

    // Populate days
    for (let d = 1; d <= totalDays; d++) {
        let day = document.createElement("div");
        day.classList.add("day");
        day.textContent = d;

        day.addEventListener("click", () => {
            if (selectedDay) selectedDay.classList.remove("selected");
            day.classList.add("selected");
            selectedDay = day;
        });

        calendar.appendChild(day);
    }
}

generateCalendar();

// Booking Button
document.querySelector(".book-btn").addEventListener("click", () => {
    if (!selectedDay) {
        alert("Please select a date first.");
        return;
    }

    const duration = document.getElementById("duration").value;

    alert(
        "Booking Confirmed!\n\n" +
        "Date: " + selectedDay.textContent +
        "\nDuration: " + duration + " mins"
    );
});


