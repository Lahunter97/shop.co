import mainTopImg from '../assets/main_top.jpg';
import renderBrandsBar from '../components/BrandsBar';

export default function renderHomePage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section has-background-light';
  section.style.minHeight = '100vh';

  section.innerHTML = `
    <div class="columns is-vcentered">
      <div class="column is-6 has-text-left pl-6">
        <h1 class="title is-1 has-text-black mb-4 has-text-weight-bold">HURRY UP!</h1>
        <p class="subtitle is-4 has-text-black mb-5">
          Only right now - huge discount on top goods!
        </p>
        <button
          id="scrollToCategories"
          class="button is-danger is-medium mb-6 has-text-weight-bold"
          style="letter-spacing: 1px"
        >
          Shop Now
        </button>
        <div class="columns is-variable is-5">
          <div class="column has-text-centered">
            <p class="title is-3 has-text-dark">850+</p>
            <p class="subtitle is-5 has-text-dark">CUSTOMERS PER DAY</p>
          </div>
          <div class="column has-text-centered">
            <p class="title is-3 has-text-dark">120+</p>
            <p class="subtitle is-5 has-text-dark">BRANDS</p>
          </div>
          <div class="column has-text-centered">
            <p class="title is-3 has-text-dark">35</p>
            <p class="subtitle is-5 has-text-dark">SHOPS NOW</p>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <figure class="image is-4by3" id="main-image" style="border-radius: 10px; overflow: hidden"></figure>
      </div>
    </div>
    <div id="brands-bar-container"></div>
    <section id="categoriesSection" class="section">
      <h2 class="title is-1 has-text-black has-text-centered mb-5">Categories</h2>
      <div id="categoriesContainer" class="columns is-multiline is-variable is-3"></div>
    </section>
  `;

  // Картинка
  const figure = section.querySelector('#main-image');
  if (figure) {
    const img = new Image();
    img.src = mainTopImg;
    img.alt = 'Main Top';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center calc(-80px)';
    img.style.width = '100%';
    img.style.height = 'auto';
    figure.appendChild(img);
  }

  // Бренды
  const brandsBarContainer = section.querySelector('#brands-bar-container');
  if (brandsBarContainer) {
    brandsBarContainer.appendChild(renderBrandsBar());
  }

  // Скролл
  setTimeout(() => {
    const scrollToBtn = section.querySelector('#scrollToCategories') as HTMLButtonElement;
    const categoriesSection = section.querySelector('#categoriesSection') as HTMLElement;
    scrollToBtn?.addEventListener('click', () => {
      categoriesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Категории (без fetch)
  function formatCategoryName(slug: string): string {
    return slug
      .split('-') // разбиваем по дефисам
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // каждое слово с заглавной
      .join(' '); // объединяем через пробел
  }

  const categoriesContainer = section.querySelector('#categoriesContainer') as HTMLElement;
  const categoryList = [
    'mens-shirts',
    'mens-shoes',
    'mens-watches',

    'tops',
    'womens-dresses',
    'womens-shoes',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',

    'sunglasses',
    'fragrances',
    'home-decoration',
  ];

  categoryList.forEach((cat) => {
    const div = document.createElement('div');
    div.className = 'column is-3-tablet is-3-desktop';

    const link = document.createElement('a');
    link.href = `/category/${cat}`;
    link.className =
      'box has-text-black has-text-centered has-text-weight-semibold is-clickable category-box';
    link.innerText = formatCategoryName(cat);

    div.appendChild(link);
    categoriesContainer.appendChild(div);
  });

  return section;
}
