import router from './router/index';
import renderHomePage from './pages/HomePage';
import renderCategoryPage from './pages/CategoryPage';
import renderProductPage from './pages/ProductPage';
import renderCartPage from './pages/CartPage';
import renderHeader from './components/Header';
import renderFooter from './components/Footer';

export function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  router
    .on('/', () => {
      root.innerHTML = '';
      root.appendChild(renderHeader());
      root.appendChild(renderHomePage());
      root.appendChild(renderFooter());
    })
    .on('/category/:categoryName', ({ data }) => {
      root.innerHTML = '';
      root.appendChild(renderHeader());
      root.appendChild(renderCategoryPage(data.categoryName));
      root.appendChild(renderFooter());
    })
    .on('/product/:productId', ({ data }) => {
      root.innerHTML = '';
      root.appendChild(renderHeader());
      root.appendChild(renderProductPage(data.productId));
      root.appendChild(renderFooter());
    })
    .on('/cart/:cartId', () => {
      root.innerHTML = '';
      root.appendChild(renderHeader());
      root.appendChild(renderCartPage());
      root.appendChild(renderFooter());
    })
    .resolve();
}
