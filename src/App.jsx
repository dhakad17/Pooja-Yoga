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
      name: 'Swati Kirar',
      role: 'Income Tax Officer | Ahmedabad',
      quote:
        'After joining these sessions, my body feels so relaxed and rejuvenated. The gentle movements and breathwork help me release all the tension I carry from my demanding job.',
      rating: 5,
    },
    {
      name: 'Rohit Sharma',
      role: 'Software Engineer | Hyderabad',
      quote:
        'I joined because of persistent body pain and stretching issues. The sessions have made me so much more flexible, and my pain has reduced dramatically. Truly life-changing!',
      rating: 5,
    },
  ]

  const asanaSlides = [
    {
      src: '/instructors/asana-restorative-backbend.jpg',
      name: 'Supta Vajrasana variation',
      line: 'A deep, heart-opening backbend that invites trust, expansion, and softness through the front body.',
    },
    {
      src: '/instructors/asana-meditation-cliff.jpg',
      name: 'Dhyana (seated meditation)',
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
    let message = `Hi Pooja!\n\n`
    message += `*Name:* ${formData.name || 'Not provided'}\n`
    message += `*Gender:* ${formData.gender || 'Not specified'}\n`
    message += `*Age:* ${formData.age || 'Not provided'}\n`
    message += `*Interest:* ${formData.interest || 'Not specified'}\n\n`
    if (formData.message) {
      message += `*Message:*\n${formData.message}\n\n`
    }
    message += `Looking forward to connecting with you!`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

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
          <div className="hero-media" aria-hidden="true">
            <video
              className="hero-video"
              src="/media/yoga-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="hero-overlay" />
          </div>

          <div className="hero-inner reveal">
            <p className="eyebrow">Premium yoga · Yogic Pooja योगिक पूजा</p>
            <h1>
              Stillness in your
              <span className="hero-accent"> body</span>, clarity in your
              <span className="hero-accent"> mind</span>, शांति मन में।
            </h1>
            <p className="hero-shloka">
              योगश्चित्तवृत्तिनिरोधः — <span>Yoga is the stilling of the changing states of the mind.</span>
            </p>
            <p className="hero-lead">
              I help people slow down, strengthen gently, and return to themselves through
              mindful movement, breath, and rest—online. धीरे-धीरे, प्यार
              से, शरीर और मन को वापस अपने केंद्र पर लाने की साधना।
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => scrollToSection('programs')}
              >
                Book a class
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => scrollToSection('contact')}
              >
                Contact me
              </button>
              <button
                type="button"
                className={`btn music-btn ${isMusicPlaying ? 'music-btn-active' : ''}`}
                onClick={async () => {
                  const audio = audioRef.current
                  if (!audio) return
                  setMusicError(false)
                  if (isMusicPlaying) {
                    audio.pause()
                    setIsMusicPlaying(false)
                  } else {
                    try {
                      await audio.play()
                      setIsMusicPlaying(true)
                    } catch {
                      setMusicError(true)
                    }
                  }
                }}
              >
                🎵 {isMusicPlaying ? 'Pause music · संगीत रोकें' : 'Play yogic music · संगीत चलाएँ'}
              </button>
            </div>
            <audio
              ref={audioRef}
              src="/media/yogic-music.mp3"
              loop
            />
            <p className="music-note">
              नर्म, ध्यानमय संगीत · Soft meditative background (you can turn it on / off)
            </p>
            {musicError && (
              <p className="music-note music-error">
                संगीत फ़ाइल नहीं मिली। कृपया `public/media/yogic-music.mp3` नाम से एक ऑडियो फ़ाइल रखें।
              </p>
            )}

            <div className="hero-trust">
              <div>
                <span className="trust-label">Experience</span>
                <span className="trust-value">3+ years teaching</span>
              </div>
              <div>
                <span className="trust-label">Focus</span>
                <span className="trust-value">Gentle · Vinyasa · Restorative</span>
              </div>
              <div>
                <span className="trust-label">Format</span>
                <span className="trust-value">Online classes only</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section shloka-strip">
          <div className="shloka-inner reveal">
            <div>
              <p className="shloka-sanskrit">शरीरमाद्यं खलु धर्मसाधनम्</p>
              <p className="shloka-meaning">
                The body is truly the primary instrument for all that we wish to create and live.
              </p>
            </div>
            <div>
              <p className="shloka-sanskrit">सुखस्थिरम् आसनम्</p>
              <p className="shloka-meaning">
                A steady, easeful seat — the heart of every posture and every practice.
              </p>
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
              <p className="eyebrow">Meet your instructor</p>
              <h2>Yoga as a gentle return to yourself · स्वयं तक वापसी की साधना।</h2>
              <p>
                I&apos;m Pooja, known as Yogic Pooja, a yoga instructor and space-holder for
                anyone seeking a kinder relationship with their body. My classes weave
                together slow, intuitive movement, grounding breathwork, and spacious rest
                so you can soften, strengthen, and remember your own rhythm.
              </p>
              <p>
                My approach is feminine, nurturing, and deeply professional—rooted in
                traditional practice, shaped by modern nervous system science, and always
                adapted to the human in front of me. परंपरागत योग और आधुनिक समझ का
                सरल, सहज मेल।
              </p>

              <div className="about-grid">
                <div>
                  <span className="trust-label">Specialities</span>
                  <p>
                    Gentle vinyasa, hormone-friendly flows, and deep restorative rest.
                    नरम, संतुलित अभ्यास जो शरीर को थकाए नहीं, सहारा दे।
                  </p>
                </div>
                <div>
                  <span className="trust-label">For you if</span>
                  <p>You crave softness, sustainable strength, and a calm, clear mind.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="offerings" className="section offerings-section">
          <div className="section-header reveal">
            <p className="eyebrow">Online group offerings</p>
            <h2>Ways to practice together.</h2>
            <p>
              Live online sessions that honor your energy and pace—always
              with room to modify and move at your comfort level.
            </p>
          </div>

          <div className="cards-grid reveal">
            <article className="card offering-card">
              <div className="card-icon">🌿</div>
              <h3>Gentle Morning Flow</h3>
              <p>
                Slow, spacious sequences to wake the body kindly and clear your mind for
                the day ahead.
              </p>
              <ul>
                <li>Soft strength &amp; mobility</li>
                <li>Guided breathwork</li>
                <li>Closing relaxation</li>
              </ul>
            </article>

            <article className="card offering-card">
              <div className="card-icon">🌙</div>
              <h3>Evening Restore</h3>
              <p>
                Nervous system-friendly sessions designed to unravel tension and invite
                deep rest.
              </p>
              <ul>
                <li>Restorative postures</li>
                <li>Supported yin shapes</li>
                <li>Yoga nidra inspired rest</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="programs" className="section programs-section">
          <div className="section-header reveal">
            <p className="eyebrow">Online classes & programs</p>
            <h2>Practice from anywhere, on your own terms.</h2>
            <p>
              Intimate online containers designed to help you build a sustainable,
              nourishing practice—without hustle or pressure.
            </p>
          </div>

          <div className="cards-grid reveal">
            <article className="card program-card">
              <header>
                <h3>Soft Strength Series</h3>
                <p className="program-tag">4-week live program</p>
              </header>
              <p>
                A grounded, progressive journey to rebuild strength and stability with
                compassion and care.
              </p>
              <ul>
                <li>2 live classes per week</li>
                <li>Recordings available for 7 days</li>
                <li>Gentle core &amp; joint support focus</li>
              </ul>
              <p className="program-price">₹4,500 · 4 weeks</p>
              <button
                type="button"
                className="btn primary full"
                onClick={() => scrollToSection('contact')}
              >
                Enroll now
              </button>
            </article>

            <article className="card program-card">
              <header>
                <h3>Evening Unwind Membership</h3>
                <p className="program-tag program-tag-soft">Monthly online studio</p>
              </header>
              <p>
                A calm, cozy online space to end your day with restorative, yin, and
                meditative practices.
              </p>
              <ul>
                <li>3 live sessions per month</li>
                <li>Library of guided practices</li>
                <li>Private members-only community</li>
              </ul>
              <p className="program-price">₹2,200 / month</p>
              <button
                type="button"
                className="btn primary full"
                onClick={() => scrollToSection('contact')}
              >
                Join the waitlist · वेटलिस्ट में जुड़ें
              </button>
            </article>
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
                <a href="#" aria-label="Instagram">
                  Instagram
                </a>
                <a href="#" aria-label="YouTube">
                  YouTube
                </a>
                <a href="#" aria-label="Email">
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
                    <option value="Private 1:1 sessions">Private 1:1 sessions</option>
                    <option value="Soft Strength series">Soft Strength series</option>
                    <option value="Evening Unwind membership">Evening Unwind membership</option>
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
