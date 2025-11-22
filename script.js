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

//  calendarDays //

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

let currentDate = new Date();

function loadCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

    calendarDays.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= lastDay; day++) {
        const div = document.createElement("div");
        div.textContent = day;

        div.addEventListener("click", () => {
            document.querySelectorAll(".calendar-days div").forEach(d => d.classList.remove("selected"));
            div.classList.add("selected");

            document.getElementById("selectedDate").value = `${day}-${month+1}-${year}`;
            document.getElementById("timeSlots").classList.remove("hidden");
        });

        calendarDays.appendChild(div);
    }
}

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
});

loadCalendar(currentDate);

// TIME SLOT SELECTION
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("click", () => {
        document.querySelectorAll(".slot").forEach(s => s.classList.remove("selected"));
        slot.classList.add("selected");

        document.getElementById("selectedTime").value = slot.textContent;

        document.getElementById("bookingForm").classList.remove("hidden");
    });
});

