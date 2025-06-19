export default function Header() {
  return (
    <header className="navbar has-background-white shadow-md px-5 py-3 is-flex is-justify-content-space-between is-align-items-center">
      {/* Левый блок с названием */}
      <a
        href="/"
        className="has-text-weight-bold"
        style={{ fontSize: '30px', marginLeft: '20px', color: '#2d3436', transition: 'color 0.3s' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0984e3')}
        onMouseLeave={e => (e.currentTarget.style.color = '#2d3436')}
      >
        Shop.Co
      </a>

      {/* Правый блок с иконками */}
      <div className="is-flex is-align-items-center" style={{ marginRight: '20px' }}>
        {/* Корзина с отступом справа */}
        <a
          href="/cart/1"
          className="has-text-dark"
          style={{ marginRight: '5px', transition: 'color 0.3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0984e3')}
          onMouseLeave={e => (e.currentTarget.style.color = '#2d3436')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'inherit' }}
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00.707 1.707h12.586a1 1 0 00.707-1.707L17 13M7 13V6h13" />
          </svg>
        </a>

        {/* Кнопка профиль пользователя */}
        <button
          className="button is-white"
          style={{ padding: '0', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'color 0.3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0984e3')}
          onMouseLeave={e => (e.currentTarget.style.color = '#2d3436')}
          aria-label="User Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="28"
            height="28"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'inherit' }}
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M6 18v-1a6 6 0 0112 0v1" />
          </svg>
        </button>
      </div>
    </header>
  )
}
