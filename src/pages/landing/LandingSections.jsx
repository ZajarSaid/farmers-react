import { Link } from 'react-router-dom'
import { useFarmers } from '../../context/FarmersContext.jsx'

export function StatsSection() {
  const { totals } = useFarmers()
  const stats = [
    { icon: 'bi-people-fill', count: totals.farmers, label: 'Registered Farmers' },
    { icon: 'bi-house-heart-fill', count: totals.farms, label: 'Registered Farms' },
    { icon: 'bi-tree-fill', count: totals.crops, label: 'Crop Types' },
    { icon: 'bi-geo-alt-fill', count: totals.regions, label: 'Regions Covered' },
  ]

  return (
    <section className="section" id="home">
      <div className="container">
        <div className="landing-stats">
          {stats.map((stat) => (
            <div className="landing-stat" key={stat.label}>
              <div className="landing-stat-icon">
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div className="landing-stat-count">{stat.count}</div>
              <div className="landing-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="section section--soft">
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title">Connecting Farmers with the Government</h2>
            <p className="section-sub">
              The Farmers Registry System (FRS) is an agriculture database of farmers created by
              the Ministry of Agriculture and Livestock. It is a mandatory registration system that
              records farmer information in a central database to ensure agriculture support is
              traceable, auditable and reportable.
            </p>
            <div className="about-features">
              <div><i className="bi bi-check-circle-fill"></i><span>Central Records</span></div>
              <div><i className="bi bi-check-circle-fill"></i><span>Farm &amp; Output Tracking</span></div>
              <div><i className="bi bi-check-circle-fill"></i><span>Regional Market Prices</span></div>
              <div><i className="bi bi-check-circle-fill"></i><span>Policy Support</span></div>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-photo">
              <img src="/Officer.jpg" alt="Farmers Registry officer" />
              <div className="about-photo-caption">
                <i className="bi bi-clipboard-data-fill"></i>
                <span>Farmer Data at a Glance — personal information, farms, crops, outputs and market prices in one central registry.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  const services = [
    {
      icon: 'bi-person-plus-fill',
      title: 'Farmer Registration',
      description: 'Create your own account and register as a farmer in the national database within minutes.',
      link: '/register',
      linkLabel: 'Register now',
    },
    {
      icon: 'bi-house-gear-fill',
      title: 'Farm Registration',
      description: 'Register your farm, choose the crop type, region and district, and update your total output securely.',
      link: '/farms',
      linkLabel: 'View farms',
    },
    {
      icon: 'bi-cash-coin',
      title: 'Market Prices',
      description: 'View up-to-date market prices for your crops across all regions of Tanzania in one place.',
      link: '/regional-prices',
      linkLabel: 'View prices',
    },
  ]

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="eyebrow">Our Services</span>
          <h2 className="section-title">What You Can Do</h2>
          <p className="section-sub">Simple steps that connect farmers and officers in one trusted platform.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="service-icon"><i className={`bi ${service.icon}`}></i></div>
              <h5>{service.title}</h5>
              <p>{service.description}</p>
              <Link to={service.link} className="service-link">
                {service.linkLabel} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    { icon: 'bi-person-plus', title: 'Step 1', description: 'Sign up and create your farmer account.' },
    { icon: 'bi-lock', title: 'Step 2', description: 'Login securely to your account dashboard.' },
    { icon: 'bi-pencil-square', title: 'Step 3', description: 'Register your farm and track your output.' },
  ]

  return (
    <section id="how-it-works" className="section section--soft">
      <div className="container">
        <div className="text-center mb-5">
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title">Get Started in Three Steps</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.title}>
              <div className="step-badge"><i className={`bi ${step.icon}`}></i></div>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <h3>JISAJILI LEO KAMA MKULIMA KWA MAENDELEO YA TAIFA</h3>
          <p className="mb-4">
            Join thousands of farmers already registered in the national system. <strong>Registration is mandatory and free.</strong>
          </p>
          <div>
            <Link className="btn btn-light-lg me-2" to="/register">
              <i className="bi bi-person-plus me-1"></i>Register Today
            </Link>
            <Link className="btn btn-outline-light-lg" to="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i>Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}