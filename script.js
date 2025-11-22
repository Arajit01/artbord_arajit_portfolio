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
