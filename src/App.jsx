import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentAsana, setCurrentAsana] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [musicError, setMusicError] = useState(false)
  const audioRef = useRef(null)

  // Form state for WhatsApp integration
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    interest: '',
    message: ''
  })

  const testimonials = [
    {
      name: 'Jagrati Patel',
      role: 'Software Engineer | Bangalore',
      quote:
        'As an IT professional, I spend most of my day at a desk. Since joining these sessions, I feel so much better—mentally more relaxed and centered. The practice has become my reset button after long work hours.',
      rating: 5,
    },
    {
      name: 'Archana Pandey',
      role: 'Teacher | Bhopal',
      quote:
        'The sessions have been transformative for me. I feel mentally relaxed, and my sleep quality has improved significantly. I wake up feeling refreshed and ready for the day.',
      rating: 5,
    },
    {
      name: 'Pranjali Nagar',
      role: 'Bank CSA | Bhopal',
      quote:
        'After joining these sessions, my body feels so relaxed and rejuvenated. The gentle movements and breathwork help me release all the tension I carry from my demanding job.',
      rating: 5,
    },
    {
      name: 'Rohit',
      role: 'Software Engineer | Hyderabad',
      quote:
        'I joined because of persistent body pain and stretching issues. The sessions have made me so much more flexible, and my pain has reduced dramatically. Truly life-changing!',
      rating: 5,
    },
  ]

  const asanaSlides = [
    {
      src: '/instructors/asana-restorative-backbend.jpg',
      name: 'Matsyasana',
      line: 'A deep, heart-opening backbend that invites trust, expansion, and softness through the front body.',
    },
    {
      src: '/instructors/asana-meditation-cliff.jpg',
      name: 'Dhyana (meditation)',
      line: 'Steady, grounded awareness—breath and landscape meeting in a single, quiet moment.',
    },
    {
      src: '/instructors/asana-forward-fold-balance.jpg',
      name: 'Forward fold balance',
      line: 'An advanced balance that builds focus, strength, and humility as you fold toward the earth.',
    },
    {
      src: '/instructors/asana-eka-pada-rajakapotasana.jpg',
      name: 'Eka Pada Rajakapotasana variation',
      line: 'A graceful hip and heart opener that channels devotion, courage, and fluid strength.',
    },
  ]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    setActiveSection(id)
    setIsMenuOpen(false)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()

    // Get WhatsApp number from environment variable
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '916265904570'

    // Format the message with form data (using plain text, no emojis for better compatibility)
    let message = 'Namaste Pooja\n';

    message += `I would like to begin my yoga journey with you.\n\n`;

    message += `*Details*\n`;
    message += `• Name: ${formData.name || 'Not provided'}\n`;
    message += `• Gender: ${formData.gender || 'Not specified'}\n`;
    message += `• Age: ${formData.age || 'Not provided'}\n`;
    message += `• Interest: ${formData.interest || 'Not specified'}\n\n`;

    if (formData.message) {
      message += ` *Message*\n${formData.message}\n\n`;
    }


    message += ` Looking forward to connecting and practicing together.\n`;
    message += `Thank you `;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");


    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  useEffect(() => {
    const ids = ['home', 'about', 'offerings', 'programs', 'testimonials', 'contact']

    const onScroll = () => {
      const scrollY = window.scrollY
      let current = 'home'

      ids.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        const offset = section.offsetTop - 140
        if (scrollY >= offset) current = id
      })

      setActiveSection(current)

      const hero = document.querySelector('.hero-media')
      if (hero) {
        const factor = Math.min(scrollY / 800, 1)
        hero.style.setProperty('--parallax-offset', `${factor * 18}px`)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
          }
        })
      },
      { threshold: 0.18 },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const id = window.setInterval(
      () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      6000,
    )
    return () => window.clearInterval(id)
  }, [testimonials.length])

  useEffect(() => {
    const id = window.setInterval(
      () => setCurrentAsana((prev) => (prev + 1) % asanaSlides.length),
      7000,
    )
    return () => window.clearInterval(id)
  }, [asanaSlides.length])
  const heroVideos = [
    "/media/yoga-hero-1.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 6000); // 6 seconds per video

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="site">
      <header className="nav-shell">
        <div className="nav-background" aria-hidden="true" />
        <div className="nav-inner">
          <button
            type="button"
            className="nav-brand"
            onClick={() => scrollToSection('home')}
          >
            <img src="/om.svg" alt="Yogic Pooja Logo" className="nav-logo" />
            <span className="nav-text">
              <span className="nav-title">Pooja</span>
              <span className="nav-subtitle">Yogic Pooja · Yoga Instructor</span>
            </span>
          </button>

          <button
            className={`nav-toggle ${isMenuOpen ? 'nav-toggle-active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className={`nav-links ${isMenuOpen ? 'nav-links-mobile-open' : ''}`} aria-label="Primary">
            {[
              ['home', 'Home'],
              ['about', 'About'],
              ['offerings', 'Offerings'],
              ['programs', 'Online Programs'],
              ['testimonials', 'Stories'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          {/* Hero Video */}
          <div className="hero-media" aria-hidden="true">
            <video
              key={currentVideo}
              className="hero-video"
              src={heroVideos[currentVideo]}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="hero-overlay" />
          </div>

          {/* Hero Content */}
          <div className="hero-inner reveal">
            <h1 className="hero-title">
              योग<br /> को अपने दैनिक जीवन का हिस्सा बनाए और स्वस्थ जीवन जिएँ।
            </h1>

            <div className="hero-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => scrollToSection("programs")}
              >
                Book a Class
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-inner">
            <div className="about-media reveal">
              <div className="asana-slider">
                <div className="about-photo-frame">
                  {asanaSlides.map((slide, index) => (
                    <div
                      key={slide.name}
                      className={`about-photo asana-slide ${index === currentAsana ? 'asana-slide-active' : ''
                        }`}
                      style={{ backgroundImage: `url(${slide.src})` }}
                    />
                  ))}
                </div>
                <div className="about-badge">
                  <p>{asanaSlides[currentAsana].name}</p>
                  <p>{asanaSlides[currentAsana].line}</p>
                </div>
                <div className="testimonial-dots asana-dots">
                  {asanaSlides.map((slide, index) => (
                    <button
                      key={slide.name}
                      type="button"
                      className={`dot ${index === currentAsana ? 'dot-active' : ''}`}
                      onClick={() => setCurrentAsana(index)}
                      aria-label={`Show asana ${slide.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="about-copy reveal">
              <p className="eyebrow" style={{ color: 'var(--color-primary)' }}>Meet your instructor</p>
              <h2>Yoga as a gentle return to yourself</h2>
              <p>
                I&apos;m Pooja, known as Yogic Pooja, a yoga instructor and space-holder for
                anyone seeking a kinder relationship with their body. My classes weave
                together slow, intuitive movement, grounding breathwork, and spacious rest
                so you can soften, strengthen, and remember your own rhythm.
              </p>
            </div>
          </div>
        </section>
        <section id="programs" className="section programs-section">
          <div className="section-header reveal">
            <p className="eyebrow">Special Pricing Available</p>
            <h2>Join Our Community & Start Your Journey 🌸</h2>
            <p>
              Join our beautiful community to help you stay rooted in your purpose.
              Practice from the comfort of your home with live sessions on Google Meet.
            </p>
          </div>

          <div className="cards-grid reveal">
            <article className="card program-card">
              <header>
                <h3>🌅 Morning Batch</h3>
                <p className="program-tag">Mon–Friday · 21 classes/month</p>
              </header>
              <p>
                Begin your mornings with transformative yoga practice. Perfect for those seeking
                a fresh start to their day with holistic wellness practices.
              </p>
              <ul>
                <li>⏰ 7:00–8:00 AM daily</li>
                <li>📅 Monday to Friday</li>
                <li>🧘 Group sessions on Google Meet</li>
                <li>🌿 Holistic yoga, pranayama, meditation</li>
                <li>💪 Build strength, flexibility & peace</li>
              </ul>
              <p className="program-price" style={{ textDecoration: 'line-through', opacity: 0.6, marginBottom: '0.3rem' }}>₹1,500/month</p>
              <p className="program-price" style={{ color: 'var(--color-terracotta)', fontSize: '1.3rem', marginBottom: '0.8rem' }}>₹999/month <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)' }}>Limited Time</span></p>
              <button
                type="button"
                className="btn primary full"
                onClick={() => scrollToSection('contact')}
              >
                Register for Morning Batch
              </button>
            </article>

            <article className="card program-card">
              <header>
                <h3>🌙 Evening 1:1 Session</h3>
                <p className="program-tag program-tag-soft">Private Personalized Sessions</p>
              </header>
              <p>
                One-on-one personalized attention for your specific needs. A healing journey
                designed just for you with focused guidance and support.
              </p>
              <ul>
                <li>⏰ 6:00–7:00 PM (flexible timing)</li>
                <li>👤 Private 1:1 sessions</li>
                <li>💚 All lifestyle disorders addressed</li>
                <li>🎯 Customized healing path</li>
                <li>🌸 Personalized lifestyle guidance</li>
              </ul>
              <p className="program-price" style={{ textDecoration: 'line-through', opacity: 0.6, marginBottom: '0.3rem' }}>₹5,000/month</p>
              <p className="program-price" style={{ color: 'var(--color-terracotta)', fontSize: '1.3rem', marginBottom: '0.8rem' }}>₹4,000/month <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)' }}>Limited Time</span></p>
              <button
                type="button"
                className="btn primary full"
                onClick={() => scrollToSection('contact')}
              >
                Register for 1:1 Session
              </button>
            </article>
          </div>

          <div className="section-inner reveal" style={{ marginTop: '3rem', padding: '2rem', background: 'var(--color-sage-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-terracotta)' }}>📌 Important Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, maxWidth: '700px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Platform:</strong> Google Meet</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Languages:</strong> Hindi & English</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Commitment required:</strong> Join with dedication to give your best</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Policy:</strong> No refund or plan postpone available</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Limited time pricing</strong> - Book now to secure special rates</li>
            </ul>
            <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: '500' }}>
              👉 Register below and we'll send you the payment details! 🙏
            </p>
          </div>
        </section>

        <section id="testimonials" className="section testimonials-section">
          <div className="section-inner reveal">
            <div className="testimonials-copy">
              <p className="eyebrow">Client stories</p>
              <h2>What students are saying.</h2>
              <p>
                My intention is for you to leave each practice feeling more connected,
                more grounded, and more yourself. Here&apos;s how that has felt for some
                of my students.
              </p>
            </div>

            <div className="testimonial-shell" aria-live="polite">
              {testimonials.map((t, index) => (
                <article
                  key={t.name}
                  className={`testimonial-card ${index === currentTestimonial ? 'testimonial-active' : ''
                    }`}
                >
                  <div className="star-rating" aria-label={`Rated ${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="testimonial-quote">“{t.quote}”</p>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </article>
              ))}

              <div className="testimonial-dots">
                {testimonials.map((t, index) => (
                  <button
                    key={t.name}
                    type="button"
                    className={`dot ${index === currentTestimonial ? 'dot-active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Show testimonial from ${t.name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-inner reveal">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Ready to begin, softly?</h2>
              <p>
                Share a few details and I&apos;ll be in touch with class recommendations
                and next steps. No pressure, no obligation—just a gentle starting point.
              </p>
              <div className="contact-social">
                <span>Connect</span>
                <a href="https://www.instagram.com/yogic_pooja_30?igsh=MXQ4eDdxNnJrcnpmZg==" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://www.youtube.com/@poojadhakad30" aria-label="YouTube">
                  YouTube
                </a>
                <a href="yogicpooja30@gmail.com" aria-label="Email">
                  Email
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleWhatsAppSubmit}
            >
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="interest">What are you interested in?</label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="Morning Batch - ₹999/month (Limited Offer)">Morning Batch - ₹999/month (Limited Offer)</option>
                    <option value="Evening 1:1 Session - ₹4000/month (Limited Offer)">Evening 1:1 Session - ₹4000/month (Limited Offer)</option>
                    <option value="Both Morning & Evening">Both Morning & Evening</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Anything you&apos;d like to share?</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Energy levels, experience, intentions, or questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn primary full">
                Send inquiry via WhatsApp 💬
              </button>
              <p className="form-note">Click to open WhatsApp and send your message to Pooja</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Pooja Dhakad · Yoga Instructor Portfolio</p>
      </footer>
    </div>
  )
}

export default App
