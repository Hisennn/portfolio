const languageButton = document.getElementById('languageButton');
const currentLanguage = document.getElementById('currentLanguage');


const translations = {
  en: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    languages: "Languages",
    profileName: "Gabriel Lemes",
    profileText: "Web Development Student<br>Learning Ruby on Rails",
    profileLang: "pt/en",
    aboutText: "I’m a <strong>frontend</strong> and <strong>web development</strong> student, currently learning JavaScript and Ruby on Rails. Studying <strong>Systems Analysis and Development</strong> and working on understanding how modern web applications function, from the interface to the backend.<br>I also plan to learn React and Node.js to build more complete applications.",
    educationText: "I’m in the third semester of <strong>Systems Analysis and Development</strong>. I also keep learning through online courses to improve my skills and stay updated.",
    formal: "Formal",
    onlineCourses: "Online Courses",
    university: "Claretiano",
    uniDate: "jan 2024 - jul 2026",
    uniCourse: "Systems Analysis and Development",
    uniType: "Associate Degree",
    onlineCourse: "Front End & UX/UI Design",
    onlineProvider: "Origamid",
    portuguese: "Portuguese",
    english: "English",
    native: "Native",
    englishLevel: "B2 Upper Intermediate | ",
    efSetLink: "EF SET",
    footerName: "Gabriel Lemes",
    footerPhone: "+55 16 9 99390-9231",
    footerEmail: "gabrielsilvarz@outlook.com",
    footerRights: "© Some rights reserved",
    project1Desc: "Text and image to ASCII with HTML/CSS and JS"
  },
  pt: {
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    education: "Formação",
    languages: "Idiomas",
    profileName: "Gabriel Lemes",
    profileText: "Estudando Desenvolvimento Web<br>Aprendendo Ruby on Rails",
    profileLang: "pt/en",
    aboutText: "Estudante de <strong>frontend</strong> e <strong>desenvolvimento web</strong>, atualmente estou aprendendo JavaScript e Ruby on Rails. Curso <strong>Análise e Desenvolvimento de Sistemas</strong> e trabalhando para entender como funcionam as aplicações web modernas, da interface ao backend.<br>Planejo aprender React e Node.js para deixar tudo completinho.",
    educationText: "Estou no terceiro semestre de <strong>Análise e Desenvolvimento de Sistemas</strong>. Também me mantenho atualizado por meio de cursos online para melhorar minhas habilidades.",
    formal: "Formal",
    onlineCourses: "Cursos Online",
    university: "Claretiano",
    uniDate: "jan 2024 - jul 2026",
    uniCourse: "Análise e Desenvolvimento de Sistemas",
    uniType: "Tecnólogo",
    onlineCourse: "Front End & UX/UI Design",
    onlineProvider: "Origamid",
    portuguese: "Português",
    english: "Inglês",
    native: "Nativo",
    englishLevel: "Intermediário Superior B2 | ",
    efSetLink: "EF SET",
    footerName: "Gabriel Lemes",
    footerPhone: "+55 16 9 99390-9231",
    footerEmail: "gabrielsilvarz@outlook.com",
    footerRights: "© Alguns direitos reservados",
    project1Desc: "Conversor de texto e imagem para ASCII com HTML/CSS e JS"
  }
};

let currentLang = 'en';

function updateContent(lang) {
  const titles = document.querySelectorAll('.articles-titles');
  titles[0].textContent = translations[lang].about;
  titles[1].textContent = translations[lang].skills;
  titles[2].textContent = translations[lang].projects;
  titles[3].textContent = translations[lang].education;
  titles[4].textContent = translations[lang].languages;
  document.querySelector('.profile-name').textContent = translations[lang].profileName;
  document.querySelector('.profile-text').innerHTML = translations[lang].profileText;
  document.querySelector('.profile-lang').textContent = translations[lang].profileLang;
  document.querySelector('.articles-about-text').innerHTML = translations[lang].aboutText;
  document.querySelector('.education-text').innerHTML = translations[lang].educationText;
  document.querySelectorAll('.education-imp span')[0].textContent = translations[lang].formal;
  document.querySelectorAll('.education-imp span')[1].textContent = translations[lang].onlineCourses;
  document.querySelector('.uni-name').firstChild.textContent = translations[lang].university;
  document.querySelector('.uni-name-date').textContent = translations[lang].uniDate;
  document.querySelector('.uni-course').textContent = translations[lang].uniCourse;
  document.querySelector('.uni-type').textContent = translations[lang].uniType;
  document.querySelector('.online-course').textContent = translations[lang].onlineCourse;
  document.querySelector('.online-type').textContent = translations[lang].onlineProvider;
  document.querySelectorAll('.lang-type')[0].textContent = translations[lang].portuguese;
  document.querySelectorAll('.lang-skill')[0].textContent = ` - ${translations[lang].native}`;
  document.querySelectorAll('.lang-type')[1].textContent = translations[lang].english;
  document.querySelector('.footer-name').textContent = translations[lang].footerName;
  document.querySelectorAll('.footer-socials li')[0].textContent = translations[lang].footerPhone;
  document.querySelectorAll('.footer-socials li')[1].textContent = translations[lang].footerEmail;
  document.querySelector('.footer-text span').textContent = translations[lang].footerRights;
  document.querySelector('.project-item span').textContent = translations[lang].project1Desc;
  currentLanguage.textContent = lang === 'en' ? '/english' : '/português';

}

languageButton.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'pt' : 'en';
  updateContent(currentLang);
});

updateContent(currentLang);
