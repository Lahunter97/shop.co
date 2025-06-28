import router from '../router';
import { updateCartCount } from '../components/Header';
import renderHeader from '../components/Header';

export default function renderProductPage(productId: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';

  section.innerHTML = `
    <nav class="breadcrumb mb-5" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a id="breadcrumb-category" href="#">Category</a></li>
        <li class="is-active"><a aria-current="page" id="breadcrumb-product">Product</a></li>
      </ul>
    </nav>

    <p id="loading" class="has-text-centered">Loading...</p>
    <div id="product-container" class="columns is-variable is-8 product-container" style="display:none"></div>
  `;

  const productContainer = section.querySelector('#product-container') as HTMLElement;
  const loadingText = section.querySelector('#loading') as HTMLElement;

  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      loadingText.style.display = 'none';
      productContainer.style.display = 'flex';

      const category = product.category;
      const formattedCategory = category
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const breadcrumbCat = section.querySelector('#breadcrumb-category') as HTMLAnchorElement;
      const breadcrumbProd = section.querySelector('#breadcrumb-product') as HTMLAnchorElement;
      breadcrumbCat.href = `/category/${category}`;
      breadcrumbCat.textContent = formattedCategory;
      breadcrumbProd.textContent = product.title;

      const thumbnails = product.images
        .map(
          (src: string, index: number) => `
          <img src="${src}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}" />
        `
        )
        .join('');

      productContainer.innerHTML = `
        <div class="column is-6 is-flex product-gallery">
          <div class="thumbnails">${thumbnails}</div>
          <div class="main-image-container">
            <img id="main-image" class="main-image" src="${product.images[0]}" alt="${product.title}" />
          </div>
        </div>

        <div class="column is-6 product-details">
          <h1 class="title is-3">${product.title}</h1>
          <p class="has-text-weight-bold is-size-4 mb-3">$${product.price}</p>
          <p class="mb-4">${product.description}</p>

          <div class="product-meta">
            <div class="product-block">
              <h3 class="meta-title">Brand</h3>
              <p class="meta-value">${product.brand}</p>
            </div>
            <div class="product-block">
              <h3 class="meta-title">In Stock</h3>
              <p class="meta-value">${product.stock} items</p>
            </div>
          </div>

          <div class="add-to-cart-block">
            <div class="quantity-controls">
              <button id="decrease-qty">-</button>
              <input id="quantity" type="number" value="1" min="1" />
              <button id="increase-qty">+</button>
            </div>
            <button id="add-to-cart" class="button is-black has-text-white">Add to Cart</button>
          </div>

          <p id="cart-message" class="has-text-success mt-2" style="display:none">Added to cart!</p>
        </div>
      `;

      const mainImage = productContainer.querySelector('#main-image') as HTMLImageElement;
      const thumbs = productContainer.querySelectorAll('.thumbnail');
      thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
          thumbs.forEach((t) => t.classList.remove('active'));
          thumb.classList.add('active');
          mainImage.src = (thumb as HTMLImageElement).src;
        });
      });

      const quantityInput = productContainer.querySelector('#quantity') as HTMLInputElement;
      const increaseBtn = productContainer.querySelector('#increase-qty')!;
      const decreaseBtn = productContainer.querySelector('#decrease-qty')!;
      increaseBtn.addEventListener('click', () => {
        quantityInput.value = String(Number(quantityInput.value) + 1);
      });
      decreaseBtn.addEventListener('click', () => {
        if (Number(quantityInput.value) > 1)
          quantityInput.value = String(Number(quantityInput.value) - 1);
      });

      const addToCartBtn = productContainer.querySelector('#add-to-cart') as HTMLButtonElement;
      const message = productContainer.querySelector('#cart-message') as HTMLElement;

      addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value, 10);
        const stored = localStorage.getItem('cart');
        const productToAdd = {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail || product.images[0],
          price: product.price,
          quantity,
        };

        let cart = stored ? JSON.parse(stored) : { id: 1, products: [] };

        const existing = cart.products.find((p: any) => p.id === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.products.push(productToAdd);
        }

        cart.total = cart.products.reduce((sum: number, p: any) => sum + p.price * p.quantity, 0);
        cart.discountedTotal = cart.products.reduce(
          (sum: number, p: any) => sum + p.price * p.quantity * 0.9, 0
        );

        localStorage.setItem('cart', JSON.stringify(cart));

        message.style.display = 'block';
        setTimeout(() => (message.style.display = 'none'), 2000);

        updateCartCount();
        const newHeader = renderHeader();
        document.querySelector('header')?.replaceWith(newHeader);
      });
    })
    .catch(() => {
      loadingText.textContent = 'Failed to load product.';
    });

  return section;
}
