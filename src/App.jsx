import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Download,
  GitBranch,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { portfolio } from './data/portfolio'
import './App.css'

const iconMap = {
  Code2,
  BookOpen,
  GraduationCap,
  Sparkles,
}

function App() {
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  const content = portfolio.languages[language]
  const resumeUrl = `${import.meta.env.BASE_URL}${portfolio.resumePath}`

  const navItems = useMemo(
    () => [
      { href: '#about', label: content.nav.about },
      { href: '#skills', label: content.nav.skills },
      { href: '#projects', label: content.nav.projects },
      { href: '#education', label: content.nav.education },
      { href: '#contact', label: content.nav.contact },
    ],
    [content],
  )

  useEffect(() => {
    // The chosen theme is written to the document so CSS can switch palettes cleanly.
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'es' : 'en'))
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-shell">
      <Header
        content={content}
        language={language}
        menuOpen={menuOpen}
        navItems={navItems}
        onLanguageToggle={toggleLanguage}
        onMenuClose={() => setMenuOpen(false)}
        onMenuToggle={() => setMenuOpen((isOpen) => !isOpen)}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <main>
        <Hero content={content} resumeUrl={resumeUrl} />
        <About content={content} />
        <Skills content={content} />
        <Projects content={content} />
        <Education content={content} />
        <Contact content={content} />
      </main>

      <Footer content={content} />
    </div>
  )
}

function Header({
  content,
  language,
  menuOpen,
  navItems,
  onLanguageToggle,
  onMenuClose,
  onMenuToggle,
  onThemeToggle,
  theme,
}) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label={content.brandAriaLabel}>
        <span>{portfolio.initials}</span>
      </a>

      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label={content.nav.ariaLabel}>
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={onMenuClose}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onLanguageToggle} aria-label={content.actions.language}>
          <Languages size={18} />
          <span>{language === 'en' ? 'ES' : 'EN'}</span>
        </button>
        <button className="icon-button" type="button" onClick={onThemeToggle} aria-label={content.actions.theme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="menu-button" type="button" onClick={onMenuToggle} aria-label={content.actions.menu}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

function Hero({ content, resumeUrl }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy reveal">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1>{content.hero.heading}</h1>
        <p className="hero-summary">{content.hero.summary}</p>
        <div className="hero-actions">
          <a className="primary-button" href={resumeUrl} download>
            <Download size={18} />
            {content.hero.resumeButton}
          </a>
          <a className="secondary-button" href="#projects">
            {content.hero.projectsButton}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <aside className="profile-panel reveal" aria-label={content.hero.cardAriaLabel}>
        <div className="profile-orbit" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="avatar-placeholder">{portfolio.initials}</div>
        <p>{content.hero.cardLabel}</p>
        <strong>{content.hero.cardTitle}</strong>
        <small>{content.hero.cardNote}</small>
      </aside>
    </section>
  )
}

function About({ content }) {
  return (
    <Section eyebrow={content.about.eyebrow} id="about" title={content.about.title}>
      <div className="about-grid">
        <p className="section-lede">{content.about.body}</p>
        <div className="stats-grid">
          {content.about.stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Skills({ content }) {
  return (
    <Section eyebrow={content.skills.eyebrow} id="skills" title={content.skills.title}>
      <div className="skills-grid">
        {content.skills.groups.map((group) => {
          const Icon = iconMap[group.icon] || Code2

          return (
            <article className="skill-card" key={group.title}>
              <Icon size={24} />
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

function Projects({ content }) {
  return (
    <Section eyebrow={content.projects.eyebrow} id="projects" title={content.projects.title}>
      <p className="section-lede">{content.projects.intro}</p>
      <div className="project-grid">
        {content.projects.items.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-preview">
              <span>{project.tag}</span>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions" aria-label={content.projects.actionAriaLabel}>
                <a href={project.githubUrl}>
                  <GitBranch size={17} />
                  GitHub
                </a>
                <a href={project.demoUrl}>
                  <ArrowUpRight size={17} />
                  Demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Education({ content }) {
  return (
    <Section eyebrow={content.education.eyebrow} id="education" title={content.education.title}>
      <div className="timeline">
        {content.education.items.map((item) => (
          <article className="timeline-item" key={item.program}>
            <span>{item.period}</span>
            <h3>{item.program}</h3>
            <p>{item.school}</p>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Contact({ content }) {
  return (
    <Section eyebrow={content.contact.eyebrow} id="contact" title={content.contact.title}>
      <div className="contact-panel">
        <p>{content.contact.body}</p>
        <div className="contact-links">
          <a href={`mailto:${portfolio.contact.email}`}>
            <Mail size={18} />
            {portfolio.contact.email}
          </a>
          <span>
            <MapPin size={18} />
            {portfolio.contact.location}
          </span>
          <a href={portfolio.contact.githubUrl}>
            <GitBranch size={18} />
            {content.contact.githubLabel}
          </a>
        </div>
      </div>
    </Section>
  )
}

function Section({ children, eyebrow, id, title }) {
  return (
    <section className="content-section reveal" id={id}>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Footer({ content }) {
  return (
    <footer className="site-footer">
      <p>{content.footer.note}</p>
      <a href="#home">{content.footer.backToTop}</a>
    </footer>
  )
}

export default App
