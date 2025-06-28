function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function renderCategoryPage(category: string): HTMLElement {
  const section = document.createElement('section');

  section.innerHTML = `
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a>Categories</a></li>
        <li class="is-active"><a id="category-name" aria-current="page"></a></li>
      </ul>
    </nav>

    <div class="columns">
      <!-- Левая колонка - фильтры -->
      <div class="column is-3" id="filters-column">
        <div class="box has-background-light">
          <div class="field">
            <label class="label">Brand</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="brand-filter">
                  <option value="">All Brands</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Min Price</label>
            <div class="control">
              <input class="input" type="number" id="min-price" placeholder="$10" />
            </div>
          </div>

          <div class="field">
            <label class="label">Max Price</label>
            <div class="control">
              <input class="input" type="number" id="max-price" placeholder="$2000" />
            </div>
          </div>

          <div class="buttons mt-4">
            <button class="button is-fullwidth" id="apply-filter">Apply filter</button>
            <button class="button is-fullwidth" id="reset-filter">Reset filter</button>
          </div>
        </div>
      </div>

      <!-- Правая колонка - заголовок и список товаров -->
      <div class="column is-9">
        <h1 class="title is-2 has-text-black capitalize mb-4" id="category-title"></h1>
        <p class="has-text-info" id="loading-text">Loading...</p>
        <p class="has-text-danger" id="error-text"></p>
        <div class="columns is-multiline is-variable is-4" id="products-list"></div>
      </div>
    </div>
  `;

  // Установка заголовков
  const nameEl = section.querySelector('#category-name')!;
  const titleEl = section.querySelector('#category-title')!;
  const formattedCategory = formatCategoryName(category);
  nameEl.textContent = formattedCategory;
  titleEl.textContent = formattedCategory;

  // Элементы формы
  const brandSelect = section.querySelector('#brand-filter') as HTMLSelectElement;
  const minPriceInput = section.querySelector('#min-price') as HTMLInputElement;
  const maxPriceInput = section.querySelector('#max-price') as HTMLInputElement;
  const applyFilterBtn = section.querySelector('#apply-filter') as HTMLButtonElement;
  const resetFilterBtn = section.querySelector('#reset-filter') as HTMLButtonElement;
  const productList = section.querySelector('#products-list') as HTMLElement;
  const loadingText = section.querySelector('#loading-text') as HTMLElement;
  const errorText = section.querySelector('#error-text') as HTMLElement;

  // Загрузка товаров
  async function fetchProducts() {
    loadingText.style.display = 'block';
    errorText.textContent = '';
    productList.innerHTML = '';

    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();

      let filtered = data.products;
      const brands = new Set<string>();

      filtered.forEach((p: any) => brands.add(p.brand));
      brandSelect.innerHTML =
        '<option value="">All Brands</option>' +
        [...brands].map((b) => `<option>${b}</option>`).join('');

      const brand = brandSelect.value;
      const min = parseFloat(minPriceInput.value);
      const max = parseFloat(maxPriceInput.value);

      if (brand) filtered = filtered.filter((p: any) => p.brand === brand);
      if (!isNaN(min)) filtered = filtered.filter((p: any) => p.price >= min);
      if (!isNaN(max)) filtered = filtered.filter((p: any) => p.price <= max);

      if (filtered.length === 0) {
        productList.innerHTML = '<p class="has-text-centered has-text-grey">No products found.</p>';
      } else {
        productList.innerHTML = filtered
          .map(
            (p: any) => `
              <div class="column is-12-mobile is-6-tablet is-4-desktop">
                <div class="box" style="cursor:pointer" data-id="${p.id}">
                  <figure class="image is-4by3 mb-3">
                    <img src="${p.thumbnail}" alt="${p.title}" style="object-fit:contain; height:200px">
                  </figure>
                  <h2 class="title is-6 mb-1">${p.title}</h2>
                  <p class="has-text-weight-semibold">$${p.price}</p>
                  <p class="has-text-grey-light is-size-7">${p.brand}</p>
                </div>
              </div>
            `
          )
          .join('');

        productList.querySelectorAll('.box').forEach((box) => {
          box.addEventListener('click', () => {
            const id = (box as HTMLElement).dataset.id;
            if (id) location.href = `/product/${id}`;
          });
        });
      }
    } catch (e) {
      errorText.textContent = 'Loading failed, no products found...';
    } finally {
      loadingText.style.display = 'none';
    }
  }

  applyFilterBtn.addEventListener('click', fetchProducts);
  resetFilterBtn.addEventListener('click', () => {
    brandSelect.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    fetchProducts();
  });

  fetchProducts();

  return section;
}
