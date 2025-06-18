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

  // Função para mostrar o conteúdo principal
  function showMainContent() {
    if (isTransitioning) return;
    isTransitioning = true;
    hasScrolled = true;

    // Adiciona a classe para iniciar a animação de saída
    introScreen.classList.add('hidden');
    introProfile.classList.add('slide-out');

    // Remove a classe hidden do conteúdo principal e adiciona visible
    bodyContent.classList.remove('hidden');
    bodyContent.classList.add('visible');

    // Após a transição, remove a tela de introdução e habilita o scroll
    setTimeout(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = 'auto';
      isTransitioning = false;
    }, 900);
  }

  // Função para lidar com o scroll
  function handleScroll(e) {
    if (hasScrolled) return;
    
    // Previne o scroll padrão
    e.preventDefault();
    
    // Se estiver rolando para baixo, mostra o conteúdo principal
    if (e.deltaY > 0) {
      showMainContent();
    }
  }

  // Adiciona o evento de scroll
  window.addEventListener('wheel', handleScroll, { passive: false });

  // Adiciona o evento de clique na seta
  scrollIndicator.addEventListener('click', (e) => {
    e.preventDefault();
    showMainContent();
  });
});
