export default function renderHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'navbar has-background-white shadow-md px-5 py-3 is-flex is-justify-content-space-between is-align-items-center';

  // Левый логотип
  const logo = document.createElement('a');
  logo.href = '/';
  logo.textContent = 'Shop.Co';
  logo.className = 'has-text-weight-bold';
  logo.style.fontSize = '30px';
  logo.style.marginLeft = '75px';
  logo.style.color = '#2d3436';
  logo.style.transition = 'color 0.3s';

  logo.addEventListener('mouseenter', () => {
    logo.style.color = '#0984e3';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.color = '#2d3436';
  });

  // Контейнер иконок
  const iconContainer = document.createElement('div');
  iconContainer.className = 'is-flex is-align-items-center';
  iconContainer.style.marginRight = '75px';
  iconContainer.style.gap = '30px';

  // Корзина
  const cart = document.createElement('a');
  cart.href = '/cart/1';
  cart.className = 'has-text-dark';
  cart.style.transition = 'color 0.3s';
  cart.style.display = 'flex';
  cart.style.alignItems = 'center';

  cart.addEventListener('mouseenter', () => {
    cart.style.color = '#0984e3';
  });
  cart.addEventListener('mouseleave', () => {
    cart.style.color = '#2d3436';
  });

  cart.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00.707 1.707h12.586a1 1 0 00.707-1.707L17 13M7 13V6h13" />
    </svg>
  `;

  // Профиль
  const profile = document.createElement('button');
  profile.className = 'button is-white';
  profile.style.padding = '0';
  profile.style.border = 'none';
  profile.style.background = 'transparent';
  profile.style.cursor = 'pointer';
  profile.style.transition = 'color 0.3s';
  profile.style.display = 'flex';
  profile.style.alignItems = 'center';

  profile.addEventListener('mouseenter', () => {
    profile.style.color = '#0984e3';
  });
  profile.addEventListener('mouseleave', () => {
    profile.style.color = '#2d3436';
  });

  profile.setAttribute('aria-label', 'User Profile');
  profile.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
      <path d="M6 18v-1a6 6 0 0112 0v1" />
    </svg>
  `;

  iconContainer.appendChild(cart);
  iconContainer.appendChild(profile);

  header.appendChild(logo);
  header.appendChild(iconContainer);

  return header;
}
