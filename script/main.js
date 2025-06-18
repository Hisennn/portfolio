const skillsContainer = document.getElementById('skillsContainer');
const allSkillsLists = skillsContainer.querySelectorAll('.articles-skills-items');
const allSkillItems = skillsContainer.querySelectorAll('.articles-skills-items li');

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getBorderColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--border-color-extra').trim();
}

allSkillsLists.forEach(skillsList => {
  skillsList.addEventListener('mousemove', (e) => {
    skillsContainer.classList.add('spotlight-active');

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    allSkillItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;

      const distance = getDistance(mouseX, mouseY, itemCenterX, itemCenterY);
      const maxDistance = 150;

      const brightness = Math.max(0.6, 1 - (distance / maxDistance * 0.4));
      const saturation = Math.max(0.7, 1 - (distance / maxDistance * 0.3));

      const icon = item.querySelector('i');
      icon.style.filter = `brightness(${brightness}) saturate(${saturation})`;
    });
  });

  skillsList.addEventListener('mouseleave', () => {
    skillsContainer.classList.remove('spotlight-active');

    allSkillItems.forEach((item) => {
      const icon = item.querySelector('i');
      icon.style.transition = 'filter 0.4s ease-out';
      icon.style.filter = 'brightness(1) saturate(1)';

      setTimeout(() => {
        icon.style.transition = 'filter 0.2s ease';
      }, 400);
    });
  });
});

const onlineType = document.querySelector('.online-type');
const onlineTooltip = document.createElement('div');
onlineTooltip.style.position = 'fixed';
onlineTooltip.style.width = '365px';
onlineTooltip.style.height = '258px';
onlineTooltip.style.backgroundImage = 'url("/img/fe-uxui.jpg")';
onlineTooltip.style.backgroundSize = 'cover';
onlineTooltip.style.backgroundPosition = 'center';
onlineTooltip.style.border = '1px solid var(--border-color)';
onlineTooltip.style.borderRadius = '0.375rem';
onlineTooltip.style.pointerEvents = 'none';
onlineTooltip.style.zIndex = '1000';
onlineTooltip.style.opacity = '0';
onlineTooltip.style.transition = 'opacity 0.2s ease';
document.body.appendChild(onlineTooltip);

onlineType.addEventListener('mouseenter', () => {
  onlineType.style.cursor = 'none';
  onlineTooltip.style.opacity = '1';
  onlineTooltip.style.borderColor = getBorderColor();
});

onlineType.addEventListener('mousemove', (e) => {
  onlineTooltip.style.left = (e.clientX + 10) + 'px';
  onlineTooltip.style.top = (e.clientY + 10) + 'px';
});

onlineType.addEventListener('mouseleave', () => {
  onlineType.style.cursor = 'pointer';
  onlineTooltip.style.opacity = '0';
});

const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-theme');
  themeButton.textContent = document.documentElement.classList.contains('light-theme') ? '/light' : '/dark';
  onlineTooltip.style.borderColor = getBorderColor();
  previewTooltip.style.borderColor = getBorderColor();
});

const previewLinks = document.querySelectorAll('.project-preview');
const previewTooltip = document.createElement('div');
previewTooltip.style.position = 'fixed';
previewTooltip.style.width = '365px';
previewTooltip.style.height = '280px';
previewTooltip.style.backgroundSize = 'cover';
previewTooltip.style.backgroundPosition = 'center';
previewTooltip.style.border = '1px solid var(--border-color)';
previewTooltip.style.borderRadius = '0.375rem';
previewTooltip.style.pointerEvents = 'none';
previewTooltip.style.zIndex = '1000';
previewTooltip.style.opacity = '0';
previewTooltip.style.transition = 'opacity 0.2s ease';
document.body.appendChild(previewTooltip);

let tooltipTarget = { x: 0, y: 0 };
let tooltipCurrent = { x: 0, y: 0 };
let tooltipAnimating = false;

previewLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.cursor = 'pointer';
    previewTooltip.style.backgroundImage = `url("${link.dataset.tooltipImg}")`;
    previewTooltip.style.opacity = '1';
    previewTooltip.style.borderColor = getBorderColor();
  });

  link.addEventListener('mousemove', (e) => {
    const height = 220;
    let top = e.clientY - height - 10;
    if (top < 0) top = 0;
    tooltipTarget.x = e.clientX + 80;
    tooltipTarget.y = top;
    if (!tooltipAnimating) {
      tooltipAnimating = true;
      animateTooltip();
    }
  });

  link.addEventListener('mouseleave', () => {
    previewTooltip.style.opacity = '0';
    tooltipAnimating = false;
  });
});

function animateTooltip() {
  if (!tooltipAnimating) return;
  tooltipCurrent.x += (tooltipTarget.x - tooltipCurrent.x) * 0.10;
  tooltipCurrent.y += (tooltipTarget.y - tooltipCurrent.y) * 0.10;
  previewTooltip.style.left = tooltipCurrent.x + 'px';
  previewTooltip.style.top = tooltipCurrent.y + 'px';
  if (previewTooltip.style.opacity === '1') {
    requestAnimationFrame(animateTooltip);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.querySelector('.intro-screen');
  const bodyContent = document.querySelector('.body-content');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const introProfile = document.querySelector('.intro-profile');
  let isTransitioning = false;
  let hasScrolled = false;

  // Mostrar conteúdo principal
  function showMainContent() {
    if (isTransitioning) return;
    isTransitioning = true;
    hasScrolled = true;
    introScreen.classList.add('hidden');
    introProfile.classList.add('slide-out');
    bodyContent.classList.remove('hidden');
    bodyContent.classList.add('visible');
    setTimeout(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = 'auto';
      isTransitioning = false;
    }, 900);
  }

  // scroll
  function handleScroll(e) {
    if (hasScrolled) return;
    e.preventDefault();
    if (e.deltaY > 0) {
      showMainContent();
    }
  }

  window.addEventListener('wheel', handleScroll, { passive: false });
  scrollIndicator.addEventListener('click', (e) => {
    e.preventDefault();
    showMainContent();
  });

  // Traduções
  const translations = {
    en: {
      'profile-text': 'Web Development Student<br>Learning Ruby on Rails',
      'profile-lang': 'pt/en',
      'download-resume': 'Download Resume',
      'about-title': 'About',
      'about-text': `I'm a <strong>frontend</strong> and <strong>web development</strong> student, currently learning JavaScript and Ruby on Rails. Studying <strong>Systems Analysis and Development</strong> and working on understanding how modern web applications function, from the interface to the backend.<br>I also plan to learn Next.js and Node.js to build more complete applications.`,
      'skills-title': 'Skills',
      'skills-intermediate': 'Intermediate',
      'skills-basic': 'Basic',
      'projects-title': 'Projects',
      'project1-title': 'Coordinates Saver',
      'project1-desc': 'Coordinates Saver for Minecraft – a tool to manage coordinates, similar to a TODO list.',
      'project2-title': 'ASCII converter',
      'project2-desc': 'Text and image converter to ASCII.',
      'education-title': 'Education',
      'education-text': `I'm in the third semester of <strong>Systems Analysis and Development</strong>. I also keep learning through online courses to improve my skills and stay updated.`,
      'education-formal': 'Formal',
      'education-uni': 'Claretiano',
      'education-uni-date': 'jan 2024 - jul 2026',
      'education-uni-course': 'Systems Analysis and Development',
      'education-uni-type': 'Associate Degree',
      'education-online': 'Online Courses',
      'education-online-course': 'Front End & UX/UI Design',
      'education-online-type': 'Origamid',
      'languages-title': 'Languages',
      'lang-pt': 'Portuguese',
      'lang-pt-skill': '- Native',
      'lang-en': 'English',
      'lang-en-skill': '- C1 Advanced |',
      'footer-name': 'Gabriel Lemes',
      'footer-rights': '© Some rights reserved',
      'footer-linkedin': 'LinkedIn',
      'footer-github': 'GitHub',
    },
    pt: {
      'profile-text': 'Estudando Desenvolvimento Web<br>Aprendendo Ruby on Rails',
      'profile-lang': 'pt/en',
      'download-resume': 'Baixar Currículo',
      'about-title': 'Sobre',
      'about-text': 'Sou estudante de <strong>frontend</strong> e <strong>desenvolvimento web</strong>, atualmente estudo JavaScript e Ruby on Rails. Curso <strong>Análise e Desenvolvimento de Sistemas</strong> e busco entender como aplicações webs modernas funcionam, da interface ao backend.<br>Pretendo aprofundar em Next.js e Node.js para criar aplicações mais completas.',
      'skills-title': 'Habilidades',
      'skills-intermediate': 'Intermediário',
      'skills-basic': 'Básico',
      'projects-title': 'Projetos',
      'project1-title': 'Coordinates Saver',
      'project1-desc': 'Coordinates Saver para Minecraft – ferramenta para gerenciar coordenadas, tipo uma lista de tarefas.',
      'project2-title': 'Conversor ASCII',
      'project2-desc': 'Conversor de texto e imagem para ASCII.',
      'education-title': 'Formação',
      'education-text': 'Estou no terceiro semestre de <strong>Análise e Desenvolvimento de Sistemas</strong>. Também faço cursos online para melhorar minhas habilidades e me manter atualizado.',
      'education-formal': 'Formal',
      'education-uni': 'Claretiano',
      'education-uni-date': 'jan 2024 - jul 2026',
      'education-uni-course': 'Análise e Desenvolvimento de Sistemas',
      'education-uni-type': 'Tecnólogo',
      'education-online': 'Cursos Online',
      'education-online-course': 'Front End & UX/UI Design',
      'education-online-type': 'Origamid',
      'languages-title': 'Idiomas',
      'lang-pt': 'Português',
      'lang-pt-skill': '- Nativo',
      'lang-en': 'Inglês',
      'lang-en-skill': '- C1 Avançado |',
      'footer-name': 'Gabriel Lemes',
      'footer-rights': '© Alguns direitos reservados',
      'footer-linkedin': 'LinkedIn',
      'footer-github': 'GitHub',
    }
  };

  function setLanguage(lang) {
    // Troca textos principais
    document.querySelectorAll('.profile-text').forEach(el => el.innerHTML = translations[lang]['profile-text']);
    document.querySelectorAll('.profile-lang').forEach(el => el.textContent = translations[lang]['profile-lang']);
    document.querySelectorAll('a[download]').forEach(el => el.textContent = translations[lang]['download-resume']);
    document.querySelectorAll('.articles-titles').forEach((el, i) => {
      if(i === 0) el.textContent = translations[lang]['about-title'];
      if(i === 1) el.textContent = translations[lang]['skills-title'];
      if(i === 2) el.textContent = translations[lang]['projects-title'];
      if(i === 3) el.textContent = translations[lang]['education-title'];
      if(i === 4) el.textContent = translations[lang]['languages-title'];
    });
    document.querySelector('.articles-about-text').innerHTML = translations[lang]['about-text'];
    document.querySelectorAll('.skill-category').forEach((el, i) => {
      if(i === 0) el.textContent = translations[lang]['skills-intermediate'];
      if(i === 1) el.textContent = translations[lang]['skills-basic'];
    });
    // Projetos
    document.querySelectorAll('.project-item').forEach((el, i) => {
      if(i === 0) {
        el.querySelector('a').textContent = translations[lang]['project1-title'];
        el.querySelectorAll('span')[0].textContent = translations[lang]['project1-desc'];
      }
      if(i === 1) {
        el.querySelector('a').textContent = translations[lang]['project2-title'];
        el.querySelectorAll('span')[0].textContent = translations[lang]['project2-desc'];
      }
    });
    // Formação
    document.querySelector('.education-text').innerHTML = translations[lang]['education-text'];
    document.querySelectorAll('.education-imp span').forEach((el, i) => {
      if(i === 0) el.textContent = translations[lang]['education-formal'];
      if(i === 1) el.textContent = translations[lang]['education-online'];
    });
    document.querySelector('.uni-name').childNodes[0].textContent = translations[lang]['education-uni'] + ' ';
    document.querySelector('.uni-name-date').textContent = translations[lang]['education-uni-date'];
    document.querySelector('.uni-course').textContent = translations[lang]['education-uni-course'];
    document.querySelector('.uni-type').textContent = translations[lang]['education-uni-type'];
    document.querySelector('.online-course').textContent = translations[lang]['education-online-course'];
    document.querySelector('.online-type').textContent = translations[lang]['education-online-type'];
    // Idiomas
    document.querySelectorAll('.lang-type')[0].textContent = translations[lang]['lang-pt'] + ' ';
    document.querySelectorAll('.lang-skill')[0].textContent = translations[lang]['lang-pt-skill'];
    const englishLi = document.querySelectorAll('.languages-item')[1].querySelector('li');
    englishLi.innerHTML = `<span class="lang-type">${translations[lang]['lang-en']} </span><span class="lang-skill">${translations[lang]['lang-en-skill']}</span> <a href="https://cert.efset.org/en/8P1jdm" target="_blank">EF SET</a>`;
    // Rodapé
    document.querySelector('.footer-name').textContent = translations[lang]['footer-name'];
    document.querySelector('.footer-text span').textContent = translations[lang]['footer-rights'];
    document.querySelectorAll('.footer-socials li a').forEach((el, i) => {
      if(i === 0) el.textContent = translations[lang]['footer-linkedin'];
      if(i === 1) el.textContent = translations[lang]['footer-github'];
    });
    // Botão de idioma
    document.getElementById('languageButton').textContent = lang === 'en' ? '/português' : '/english';
  }

  function getUserLang() {
    const saved = localStorage.getItem('site-lang');
    if(saved) return saved;
    const navLang = navigator.language || navigator.userLanguage;
    return navLang.startsWith('pt') ? 'pt' : 'en';
  }

  // Troca de idioma
  let lang = getUserLang();
  setLanguage(lang);
  document.getElementById('languageButton').addEventListener('click', () => {
    lang = lang === 'en' ? 'pt' : 'en';
    setLanguage(lang);
    localStorage.setItem('site-lang', lang);
  });
});
