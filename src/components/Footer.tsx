export default function Footer() {
  return (
    <footer className="has-background-dark has-text-white p-6 mt-6">
      <div className="container is-max-desktop is-flex is-flex-direction-column-mobile is-flex-direction-row-tablet is-justify-content-space-between is-align-items-center">
        <p className="has-text-centered-mobile has-text-left-tablet mb-4 mb-tablet-0">
          © 2025 Yahor Lahun. Shop-Co. All rights reserved. 
        </p>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              style={{ minWidth: '220px' }}
            />
          </div>
          <div className="control">
            <button className="button is-info">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
