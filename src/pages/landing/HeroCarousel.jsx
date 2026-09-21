import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    id: 1,
    className: 'hero-slide hero-slide--1',
    image: '/Farmers.png',
    icon: 'bi-person-rolodex',
    title: 'Farmers Registry System',
    description:
      'The Farmers Registry System (FRS) is an agriculture database of farmers created by the Ministry of Agriculture and Livestock. It keeps records that are traceable, auditable and reportable.',
    primary: { label: 'Sign Up Today', icon: 'bi-person-plus', to: '/register' },
    secondary: { label: 'Learn More', to: '#about', type: 'anchor' },
  },
  {
    id: 2,
    className: 'hero-slide hero-slide--2',
    image: '/MamaAfrica.jpg',
    icon: 'bi-houses-fill',
    title: 'Farmer Data Management',
    description:
      'A holistic system that keeps records of personal information and assets — land, livestock and inputs — as well as cropping patterns and average yields of farmers.',
    primary: { label: 'Get Started', icon: 'bi-rocket-takeoff', to: '/register' },
    secondary: { label: 'Our Services', to: '#services', type: 'anchor' },
  },
  {
    id: 3,
    className: 'hero-slide hero-slide--3',
    image: '/Agriculture_man.jpg',
    icon: 'bi-graph-up-arrow',
    title: 'Support & Monitoring',
    description:
      'Agricultural support is implemented, monitored and audited efficiently through the Farmers Registration System, while informing the creation of agricultural policies.',
    primary: { label: 'Register as a Farmer', icon: 'bi-plant', to: '/register' },
    secondary: { label: 'Login', icon: 'bi-box-arrow-in-right', to: '/login' },
  },
]

function SlideButton({ action }) {
  if (action.type === 'anchor') {
    return (
      <a
        className="btn btn-ghost"
        href={action.to}
        onClick={(event) => {
          event.preventDefault()
          const element = document.getElementById(action.to.slice(1))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {action.label}
      </a>
    )
  }
  return (
    <Link className="btn btn-primary-lg" to={action.to}>
      <i className={`${action.icon} me-1`}></i>{action.label}
    </Link>
  )
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-carousel">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${slide.className} ${index === active ? 'hero-slide--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-caption container">
            <div className="hero-icon">
              <i className={`bi ${slide.icon}`}></i>
            </div>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <div className="hero-actions">
              <SlideButton action={slide.primary} />
              <SlideButton action={slide.secondary} />
            </div>
          </div>
        </div>
      ))}

      <div className="hero-indicators">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-indicator ${index === active ? 'hero-indicator--active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <button type="button" className="hero-control hero-control--prev" onClick={() => setActive((active - 1 + SLIDES.length) % SLIDES.length)} aria-label="Previous slide">
        <i className="bi bi-chevron-left"></i>
      </button>
      <button type="button" className="hero-control hero-control--next" onClick={() => setActive((active + 1) % SLIDES.length)} aria-label="Next slide">
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}