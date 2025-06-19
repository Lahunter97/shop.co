import { useEffect, useState } from 'react';
import axios from 'axios';
import router from '../router';
import { useParams } from '../hooks/useParams';

export default function CategoryPage() {
  const { categoryName } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: ''
  });

  // Категории с домашней страницы
  const categories = [
    'outerwear', 't-shirts', 'polo', 'shorts',
    'jackets', 'shoes', 'underwear', 'jeans',
    'sweaters', 'skirts', 'hats', 'socks'
  ];

  // Пример брендов
  const brands = ['Levi\'s', 'Polo', 'Nike', 'TomyJeans', 'CAMPER', 'ADIDAS', 'ZARA'];

  useEffect(() => {
    fetchProducts();
  }, [categoryName, filters.brand, filters.minPrice, filters.maxPrice]);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
      let data = Array.isArray(res.data) ? res.data : [];

      if (filters.brand) {
        data = data.filter(p => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase());
      }
      if (filters.minPrice) {
        data = data.filter(p => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        data = data.filter(p => p.price <= Number(filters.maxPrice));
      }

      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  function resetFilters() {
    setFilters({ brand: '', minPrice: '', maxPrice: '' });
  }

  function goToProduct(productId: number) {
    router.navigate(`/product/${productId}`);
  }

  function goHome() {
    router.navigate('/');
  }

  return (
    <div className="min-vh-100 p-6" style={{
      backgroundColor: '#FFFF',
    }}>
      {/* Хлебные крошки */}
      <nav className="breadcrumb is-5 mb-5" aria-label="breadcrumbs">
        <ul>
          <li><a style={{cursor: 'pointer'}} onClick={goHome}>Home</a></li>
          <li className="is-active"><a aria-current="page">Categories</a></li>
        </ul>
      </nav>

      <h1 className="title is-2 has-text-black mb-6 capitalize has-text-centered">
        Category: {categoryName}
      </h1>

      <div className="columns">
        {/* Левая колонка - фильтры */}
        <div className="column is-3">
          <div className="box has-background-black">
            <div className="field">
              <label className="label">Brand</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="brand" value={filters.brand} onChange={handleFilterChange}>
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Min Price</label>
              <div className="control">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Max Price</label>
              <div className="control">
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="input"
                />
              </div>
            </div>

            <div className="field is-grouped is-grouped-multiline mt-4">
              <div className="control is-expanded">
                <button onClick={fetchProducts} className="button is-info is-fullwidth">Apply filter</button>
              </div>
              <div className="control is-expanded">
                <button onClick={resetFilters} className="button is-warning is-fullwidth">Reset filter</button>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка - товары */}
        <div className="column is-9">
          {loading && <p className="has-text-info has-text-weight-semibold">Loading...</p>}
          {error && <p className="has-text-danger has-text-weight-semibold">{error}</p>}

          <div className="columns is-multiline is-variable is-4">
            {products.length > 0 ? products.map(product => (
              <div key={product.id} className="column is-12-mobile is-6-tablet is-4-desktop">
                <div
                  onClick={() => goToProduct(product.id)}
                  className="box has-background-white-ter is-clickable"
                  style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <figure className="image is-4by3 mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ objectFit: 'contain', height: '200px' }}
                    />
                  </figure>
                  <h2 className="title is-5 has-text-info mb-2">{product.title}</h2>
                  <p className="has-text-weight-semibold mb-1">${product.price}</p>
                  <p className="has-text-grey">{product.category}</p>
                </div>
              </div>
            )) : (
              !loading && <p className="has-text-centered has-text-grey">No products found for this category and filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
