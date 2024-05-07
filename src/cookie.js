import 'cookieconsent/build/cookieconsent.min.css'; // Если вы используете Vite для обработки CSS
import 'cookieconsent/build/cookieconsent.min.js';


window.addEventListener('DOMContentLoaded', () => {
  cookieconsent.initialise({
    palette: {
      popup: { background: "#000" },
      button: { background: "#f1d600" },
    },
    theme: "classic",
    content: {
      message: "Этот веб-сайт использует файлы cookie, чтобы обеспечить вам максимально эффективное использование нашего веб-сайта.",
      dismiss: "Принял!",
      link: "Изучить больше.",
      href: "/privacy-policy/"
    }
  });
});