import router from '../router';

export default function renderCartPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container">
      <nav class="breadcrumb mb-5" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li class="is-active"><a aria-current="page">Cart</a></li>
        </ul>
      </nav>

      <h1 class="title is-2 has-text-black">Your Cart</h1>

      <div class="columns">
        <div class="column is-7" id="cart-items"></div>
        <div class="column is-5" id="cart-summary"></div>
      </div>

      <p id="cart-empty" class="has-text-centered has-text-grey mt-6">Your cart is currently empty.</p>
    </div>
  `;

  const itemsContainer = section.querySelector('#cart-items') as HTMLElement;
  const summaryContainer = section.querySelector('#cart-summary') as HTMLElement;
  const emptyMessage = section.querySelector('#cart-empty') as HTMLElement;

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || 'null');

    if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
      itemsContainer.innerHTML = '';
      summaryContainer.innerHTML = '';
      emptyMessage.style.display = 'block';
      return;
    }

    renderItems(cart.products);
    renderSummary(cart);
  }

  function renderItems(products: any[]) {
    itemsContainer.innerHTML = '';
    emptyMessage.style.display = 'none';

    products.forEach((product: any) => {
      const item = document.createElement('div');
      item.className = 'box cart-item';
      item.innerHTML = `
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <div class="is-flex is-align-items-center gap">
            <img src="${product.thumbnail}" class="cart-item-thumb" alt="${product.title}" />
            <div>
              <h2 class="title is-5 has-text-grey">${product.title}</h2>
              <p class="has-text-black has-text-weight-bold">$${product.price} x ${product.quantity}</p>
            </div>
          </div>
          <button class="delete is-medium" data-id="${product.id}"></button>
        </div>
      `;
      item.querySelector('.delete')?.addEventListener('click', () => handleDelete(product.id));
      itemsContainer.appendChild(item);
    });
  }

  function handleDelete(productId: number) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const remaining = cart.products.filter((p: any) => p.id !== productId);

    if (remaining.length === 0) {
      localStorage.removeItem('cart');
      router.navigate('/');
    } else {
      const updatedCart = {
        ...cart,
        products: remaining,
        total: remaining.reduce((sum: number, p: any) => sum + p.price * p.quantity, 0),
        discountedTotal: remaining.reduce((sum: number, p: any) => sum + p.price * p.quantity * 0.9, 0),
      };

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      renderItems(updatedCart.products);
      renderSummary(updatedCart);
    }
  }

  function renderSummary(cart: any) {
    const subtotal = cart.total;
    const discount = subtotal - cart.discountedTotal;
    const total = cart.discountedTotal;

    summaryContainer.innerHTML = `
      <div class="box has-background-light">
        <h2 class="title is-4 has-text-black">Order Summary</h2>
        <p class="has-text-grey">Subtotal: <span class="has-text-black has-text-weight-bold">$${subtotal.toFixed(2)}</span></p>
        <p class="has-text-grey">Discount: <span class="has-text-black has-text-weight-bold">$${discount.toFixed(2)}</span></p>
        <p class="has-text-grey">Total: <span class="has-text-black has-text-weight-bold">$${total.toFixed(2)}</span></p>
        <button class="button is-black has-text-white is-fullwidth mt-4" id="go-to-checkout">Go to Checkout</button>
      </div>
    `;

    const checkoutBtn = section.querySelector('#go-to-checkout') as HTMLButtonElement;
    checkoutBtn.addEventListener('click', () => {
      router.navigate(`/checkout/${cart.id || 1}`);
    });
  }

  loadCart();
  return section;
}
