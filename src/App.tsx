import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, Flame, GraduationCap, Languages, Menu, Search, Sparkles, Target, X } from 'lucide-react';

const lessons = [
  { title: 'Understanding fractions', subject: 'Mathematics', level: 'Beginner', time: '12 min', color: 'violet', symbol: '÷' },
  { title: 'The water cycle', subject: 'Science', level: 'Beginner', time: '15 min', color: 'blue', symbol: '◉' },
  { title: 'Building better sentences', subject: 'English', level: 'Intermediate', time: '10 min', color: 'amber', symbol: 'Aa' },
  { title: 'Our country', subject: 'Social studies', level: 'Beginner', time: '18 min', color: 'green', symbol: '⌂' },
];
const subjects = ['All subjects', 'Mathematics', 'Science', 'English', 'Social studies'];

export default function App() {
  const [subject, setSubject] = useState('All subjects');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [menuOpen, setMenuOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const visibleLessons = useMemo(() => lessons.filter((lesson) =>
    (subject === 'All subjects' || lesson.subject === subject) &&
    `${lesson.title} ${lesson.subject}`.toLowerCase().includes(query.toLowerCase())
  ), [subject, query]);
  const toggleDone = (title: string) => setCompleted((items) =>
    items.includes(title) ? items.filter((item) => item !== title) : [...items, title]
  );

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark"><GraduationCap size={23}/></span>pathshala<span className="brand-ai">.ai</span></a>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        <a className="nav-link active" href="#learn" onClick={() => setMenuOpen(false)}>Learn</a>
        <a className="nav-link" href="#subjects" onClick={() => setMenuOpen(false)}>Subjects</a>
        <a className="nav-link" href="#progress" onClick={() => setMenuOpen(false)}>My progress</a>
      </nav>
      <div className="topbar-actions">
        <label className="language-select"><Languages size={16}/><select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Learning language"><option>English</option><option>తెలుగు</option><option>हिन्दी</option><option>தமிழ்</option><option>ಕನ್ನಡ</option></select><ChevronDown size={14}/></label>
        <span className="avatar">S</span>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>
    <main id="home" className="page-wrap">
      <section className="welcome-row">
        <div><p className="eyebrow"><Sparkles size={14}/> YOUR LEARNING SPACE</p><h1>Learn something <span>new today.</span></h1><p className="welcome-copy">Small steps lead to big discoveries. Pick a lesson and keep growing.</p></div>
        <div className="streak-card"><span className="streak-icon"><Flame size={21}/></span><div><strong>Keep it going</strong><span>{completed.length ? `${completed.length} lesson(s) completed` : 'Your learning journey starts here'}</span></div></div>
      </section>
      <section className="hero-card"><div className="hero-content"><span className="hero-kicker">A LITTLE PROGRESS EVERY DAY</span><h2>Your curiosity is<br/>your superpower.</h2><p>Explore topics, understand ideas, and learn at your own pace.</p><a className="hero-button" href="#learn">Explore lessons <ArrowRight size={17}/></a></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="book-art"><BookOpen size={76}/></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span></div></section>
      <section className="stats-grid" id="progress">
        <div className="stat-card"><span className="stat-icon purple"><BookOpen size={19}/></span><div><strong>{completed.length}</strong><span>Lessons completed</span></div></div>
        <div className="stat-card"><span className="stat-icon blue"><Clock3 size={19}/></span><div><strong>{completed.length * 12} min</strong><span>Learning time</span></div></div>
        <div className="stat-card"><span className="stat-icon orange"><Target size={19}/></span><div><strong>1</strong><span>Learning goal</span></div></div>
      </section>
      <section className="lessons-section" id="learn">
        <div className="section-heading"><div><p className="eyebrow">FIND YOUR NEXT DISCOVERY</p><h2>Explore lessons</h2></div><label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search lessons..." aria-label="Search lessons"/></label></div>
        <div className="filter-row" id="subjects">{subjects.map((item) => <button key={item} className={subject === item ? 'filter-chip selected' : 'filter-chip'} onClick={() => setSubject(item)}>{item}</button>)}</div>
        <div className="lesson-grid">{visibleLessons.map((lesson) => {
          const done = completed.includes(lesson.title);
          return <article className="lesson-card" key={lesson.title}><div className={`lesson-visual ${lesson.color}`}><span className="lesson-subject">{lesson.subject}</span><span className="lesson-symbol">{lesson.symbol}</span></div><div className="lesson-info"><div className="lesson-meta"><span>{lesson.level}</span><span><Clock3 size={13}/> {lesson.time}</span></div><h3>{lesson.title}</h3><button className={done ? 'lesson-action done' : 'lesson-action'} onClick={() => toggleDone(lesson.title)}>{done ? <><CheckCircle2 size={16}/> Completed</> : <>Mark as complete <ArrowRight size={15}/></>}</button></div></article>;
        })}{visibleLessons.length === 0 && <div className="empty-state"><strong>No lessons found</strong><span>Try another search or subject.</span></div>}</div>
      </section>
      <footer className="footer"><span>© {new Date().getFullYear()} Pathshala AI</span><span>Learn anything. In any language. Anywhere.</span></footer>
    </main>
  </div>;
}
