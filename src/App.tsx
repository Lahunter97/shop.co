import { useEffect, useState } from 'react';
import router from './router';

// Страницы
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';

// Компоненты
import Header from './components/Header';
// import Navbar from './components/Navbar'; // Убираем импорт
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState<JSX.Element>(<HomePage />);

  useEffect(() => {
    router
      .on('/', () => setPage(<HomePage />))
      .on('/category/:categoryName', ({ data }) =>
        setPage(<CategoryPage categoryName={data.categoryName} />)
      )
      .on('/product/:productId', ({ data }) =>
        setPage(<ProductPage productId={data.productId} />)
      )
      .on('/cart/:cartId', ({ data }) =>
        setPage(<CartPage cartId={data.cartId} />)
      )
      .on('/checkout/:cartId', ({ data }) =>
        setPage(<CheckoutPage cartId={data.cartId} />)
      )
      .on('/confirmation', () => setPage(<ConfirmationPage />))
      .resolve();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Navbar /> Убираем из JSX */}

      <main className="flex-1 p-4">
        {page}
      </main>

      <Footer />
    </div>
  );
}

export default App;
