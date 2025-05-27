const skillsContainer = document.getElementById('skillsContainer');
const skillsList = document.getElementById('skillsList');
const skillItems = skillsList.querySelectorAll('li');

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getBorderColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--border-color-extra').trim();
}

skillsList.addEventListener('mousemove', (e) => {
  skillsContainer.classList.add('spotlight-active');

  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  skillItems.forEach((item) => {
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

  skillItems.forEach((item) => {
    const icon = item.querySelector('i');
    icon.style.transition = 'filter 0.4s ease-out';
    icon.style.filter = 'brightness(1) saturate(1)';

    setTimeout(() => {
      icon.style.transition = 'filter 0.2s ease';
    }, 400);
  });
});

const onlineType = document.querySelector('.online-type');
const tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.width = '365px';
tooltip.style.height = '258px';
tooltip.style.backgroundImage = 'url("/img/fe-uxui.jpg")';
tooltip.style.backgroundSize = 'cover';
tooltip.style.backgroundPosition = 'center';
tooltip.style.border = '1px solid var(--border-color)';
tooltip.style.borderRadius = '0.375rem';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '1000';
tooltip.style.opacity = '0';
tooltip.style.transition = 'opacity 0.2s ease';
document.body.appendChild(tooltip);

onlineType.addEventListener('mouseenter', () => {
  onlineType.style.cursor = 'none';
  tooltip.style.opacity = '1';
  tooltip.style.borderColor = getBorderColor();
});

onlineType.addEventListener('mousemove', (e) => {
  tooltip.style.left = (e.clientX + 10) + 'px';
  tooltip.style.top = (e.clientY + 10) + 'px';
});

onlineType.addEventListener('mouseleave', () => {
  onlineType.style.cursor = 'pointer';
  tooltip.style.opacity = '0';
});

const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-theme');
  themeButton.textContent = document.documentElement.classList.contains('light-theme') ? '/light' : '/dark';
  
  tooltip.style.borderColor = getBorderColor();
});

const asciiPreviewLink = document.querySelector('.ascii-preview');
const asciiTooltip = document.createElement('div');
asciiTooltip.style.position = 'fixed';
asciiTooltip.style.width = '365px';
asciiTooltip.style.height = '280px';
asciiTooltip.style.backgroundImage = 'url("/img/ascii.jpg")';
asciiTooltip.style.backgroundSize = 'cover';
asciiTooltip.style.backgroundPosition = 'center';
asciiTooltip.style.border = '1px solid var(--border-color)';
asciiTooltip.style.borderRadius = '0.375rem';
asciiTooltip.style.pointerEvents = 'none';
asciiTooltip.style.zIndex = '1000';
asciiTooltip.style.opacity = '0';
asciiTooltip.style.transition = 'opacity 0.2s ease';
document.body.appendChild(asciiTooltip);

let asciiTooltipTarget = { x: 0, y: 0 };
let asciiTooltipCurrent = { x: 0, y: 0 };
let asciiTooltipAnimating = false;

asciiPreviewLink.addEventListener('mouseenter', () => {
  asciiPreviewLink.style.cursor = 'pointer';
  asciiTooltip.style.opacity = '1';
  asciiTooltip.style.borderColor = getBorderColor();
});

asciiPreviewLink.addEventListener('mousemove', (e) => {
  const tooltipHeight = 220; 
  let top = e.clientY - tooltipHeight - 10;
  if (top < 0) top = 0;
  asciiTooltipTarget.x = e.clientX + 80;
  asciiTooltipTarget.y = top;
  if (!asciiTooltipAnimating) {
    asciiTooltipAnimating = true;
    animateAsciiTooltip();
  }
});

asciiPreviewLink.addEventListener('mouseleave', () => {
  asciiPreviewLink.style.cursor = 'pointer';
  asciiTooltip.style.opacity = '0';
  asciiTooltipAnimating = false;
});

function animateAsciiTooltip() {
  if (!asciiTooltipAnimating) return;
  asciiTooltipCurrent.x += (asciiTooltipTarget.x - asciiTooltipCurrent.x) * 0.10;
  asciiTooltipCurrent.y += (asciiTooltipTarget.y - asciiTooltipCurrent.y) * 0.10;
  asciiTooltip.style.left = asciiTooltipCurrent.x + 'px';
  asciiTooltip.style.top = asciiTooltipCurrent.y + 'px';
  if (asciiTooltip.style.opacity === '1') {
    requestAnimationFrame(animateAsciiTooltip);
  }
}