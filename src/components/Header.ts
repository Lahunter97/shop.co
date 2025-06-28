import router from '../router';

export default function renderHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'navbar has-background-white shadow-md px-5 py-3 is-flex is-justify-content-space-between is-align-items-center';

  // Логотип
  const logo = document.createElement('a');
  logo.href = '/';
  logo.textContent = 'Shop.Co';
  logo.className = 'has-text-weight-bold';
  logo.style.fontSize = '30px';
  logo.style.marginLeft = '75px';
  logo.style.color = '#2d3436';
  logo.style.transition = 'color 0.3s';

  logo.addEventListener('mouseenter', () => (logo.style.color = '#0984e3'));
  logo.addEventListener('mouseleave', () => (logo.style.color = '#2d3436'));

  // Иконки
  const iconContainer = document.createElement('div');
  iconContainer.className = 'is-flex is-align-items-center';
  iconContainer.style.marginRight = '75px';
  iconContainer.style.gap = '30px';

  // Корзина
  const cartLink = document.createElement('a');
  cartLink.href = '#';
  cartLink.className = 'cart-link has-text-dark';
  cartLink.style.position = 'relative';

  cartLink.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" stroke-width="2">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00.707 1.707h12.586a1 1 0 00.707-1.707L17 13M7 13V6h13" />
    </svg>
    <span id="cart-count" class="cart-count">0</span>
  `;

  // Навигация на CartPage
  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (cart?.id) {
      router.navigate(`/cart/${cart.id}`);
    } else {
      router.navigate('/');
    }
  });

  // Профиль (заглушка)
  const profile = document.createElement('button');
  profile.className = 'button is-white';
  profile.style.background = 'transparent';
  profile.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28" stroke-width="2">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
      <path d="M6 18v-1a6 6 0 0112 0v1" />
    </svg>
  `;

  iconContainer.appendChild(cartLink);
  iconContainer.appendChild(profile);

  header.appendChild(logo);
  header.appendChild(iconContainer);

  // Обновить количество товаров после отрисовки
  setTimeout(updateCartCount, 0);

  return header;
}

// Обновление количества товаров в иконке
export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || 'null');
  const count = cart?.products?.reduce((sum: number, p: any) => sum + p.quantity, 0) || 0;
  const counter = document.getElementById('cart-count');
  if (counter) counter.textContent = String(count);
}
