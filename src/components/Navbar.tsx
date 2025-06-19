export default function Navbar() {
  return (
    <nav className="navbar has-background-primary px-5 py-3">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <a
            href="/"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Home
          </a>
          <a
            href="/category/electronics"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Category: Electronics
          </a>
          <a
            href="/product/123"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Product 123
          </a>
          <a
            href="/cart/1"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Cart
          </a>
          <a
            href="/checkout/1"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Checkout
          </a>
          <a
            href="/confirmation"
            className="navbar-item has-text-weight-bold"
            style={{ color: '#0a3d62', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#072a43')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0a3d62')}
          >
            Confirmation
          </a>
        </div>
      </div>
    </nav>
  )
}
