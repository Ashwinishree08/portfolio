function toggleTheme() {
  const darkClass = 'dark-mode';
  document.body.classList.toggle(darkClass);
  localStorage.setItem('theme', document.body.classList.contains(darkClass) ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
  // Dark mode
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Typing effect (play once)
  const text = "I build full‑stack web apps with ReactJS, Spring Boot, and MongoDB, focusing on clean UI and performant back‑end logic.";
  const el = document.getElementById("typed-text");
  let index = 0;

  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, 40);
    } else {
      el.style.borderRight = "none"; // stop blinking cursor
    }
  }

  type();
});
