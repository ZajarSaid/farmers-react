import { Link } from 'react-router-dom'

export default function LandingFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="site-brand-badge site-brand-badge--light">
                <img src="/tz_gov_logo.png" alt="Tanzania Government logo" />
              </span>
              <h6 className="mb-0 text-white">Farmers Registry</h6>
            </div>
            <p>
              The Farmers Registry System (FRS) is an agriculture database of farmers created by the
              Ministry of Agriculture and Livestock. It keeps agriculture support traceable, auditable
              and reportable.
            </p>
          </div>

          <div>
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" onClick={(event) => { event.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) }}>Home</a></li>
              <li><a href="#about" onClick={(event) => { event.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>About</a></li>
              <li><a href="#services" onClick={(event) => { event.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>Services</a></li>
              <li><a href="#contact" onClick={(event) => { event.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/farms">Register Farm</Link></li>
              <li><Link to="/dashboard">Officer Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-3">Contact Us</h6>
            <p><i className="bi bi-envelope-fill me-2"></i>support@farmersregistry.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i>+255 22 000 000</p>
            <p><i className="bi bi-geo-alt-fill me-2"></i>PTA Street, Dar es Salaam, TANZANIA</p>
            <div className="footer-social d-flex gap-2">
              <a href="#" aria-label="Facebook" onClick={(event) => event.preventDefault()}><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter" onClick={(event) => event.preventDefault()}><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="Instagram" onClick={(event) => event.preventDefault()}><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="LinkedIn" onClick={(event) => event.preventDefault()}><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2026 Ministry of Agriculture. All rights reserved.
        </div>
      </div>
    </footer>
  )
}