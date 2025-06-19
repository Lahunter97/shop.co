import { useEffect, useState, useRef } from 'react';
import mainTopImg from '../assets/main_top.jpg';
import BrandsBar from '../components/BrandsBar'; // Импортируем BrandsBar

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ backgroundColor: '#F2F0F1', minHeight: '100vh' }}>
      {/* Новый главный блок */}
      <section className="section py-6">
        <div className="columns is-vcentered">
          {/* Левая колонка: текст и кнопка */}
          <div className="column is-6 has-text-left pl-6">
            <h1 className="title is-1 has-text-black mb-4" style={{ fontWeight: '700' }}>
              HURRY UP!
            </h1>
            <p className="subtitle is-4 has-text-black mb-5">
              Only right now - huge discount on top goods!
            </p>
            <button
              onClick={scrollToCategories}
              className="button is-danger is-medium mb-6"
              style={{ fontWeight: '700', letterSpacing: '1px' }}
            >
              Shop Now
            </button>

            {/* Информационные карточки */}
            <div className="columns is-variable is-5">
              <div className="column has-text-centered">
                <p className="title is-3 has-text-dark">850+</p>
                <p className="subtitle is-5 has-text-dark">CUSTOMERS PER DAY</p>
              </div>
              <div className="column has-text-centered">
                <p className="title is-3 has-text-dark">120+</p>
                <p className="subtitle is-5 has-text-dark">BRANDS</p>
              </div>
              <div className="column has-text-centered">
                <p className="title is-3 has-text-dark">35</p>
                <p className="subtitle is-5 has-text-dark">SHOPS NOW</p>
              </div>
            </div>
          </div>

          {/* Правая колонка: изображение */}
          <div
            style={{
              width: '100%',
              height: '500px',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <img
              src={mainTopImg}
              alt="Main Top"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `center calc(-80px)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Бренды с белым фоном */}
      <div style={{ backgroundColor: 'white' }}>
        <BrandsBar />
      </div>

      {/* Категории */}
      <section ref={categoriesRef} className="section">
  <h2 className="title is-1 has-text-black has-text-centered mb-5">Categories</h2>
  <div className="columns is-multiline is-variable is-3">
    {[
      'outerwear', 't-shirts', 'polo', 'shorts',
      'jackets', 'shoes', 'underwear', 'jeans',
      'sweaters', 'skirts','hats', 'socks'
    ].map(category => (
      <div key={category} className="column is-3-tablet is-3-desktop">
        <a
          href={`/category/${category}`}
          className="box has-text-black has-text-centered has-text-weight-semibold is-clickable"
          style={{
            backgroundColor: '#D9D6D5',
            fontSize: '2rem',
            borderRadius: '40px',
            padding: '70px',
            fontWeight: '700',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </a>
      </div>
    ))}
  </div>
</section>



    </div>
  );
}
