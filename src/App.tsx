import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,
  signOut, updateProfile, User
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, Flame,
  GraduationCap, Languages, LogOut, Menu, Search, Sparkles, Target, X
} from 'lucide-react';
import { auth, db } from './lib/firebase';

const lessons = [
  { title: 'Understanding fractions', subject: 'Mathematics', level: 'Beginner', time: '12 min', color: 'violet', symbol: '÷' },
  { title: 'The water cycle', subject: 'Science', level: 'Beginner', time: '15 min', color: 'blue', symbol: '◉' },
  { title: 'Building better sentences', subject: 'English', level: 'Intermediate', time: '10 min', color: 'amber', symbol: 'Aa' },
  { title: 'Our country', subject: 'Social studies', level: 'Beginner', time: '18 min', color: 'green', symbol: '⌂' },
];
const subjects = ['All subjects', 'Mathematics', 'Science', 'English', 'Social studies'];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [busy, setBusy] = useState(false);
  const [subject, setSubject] = useState('All subjects');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [menuOpen, setMenuOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [progressReady, setProgressReady] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (current) => {
    setUser(current);
    setAuthReady(true);
  }), []);

  useEffect(() => {
    if (!user) { setCompleted([]); setProgressReady(false); return; }
    let active = true;
    getDoc(doc(db, 'users', user.uid)).then((snapshot) => {
      if (!active) return;
      const saved = snapshot.data()?.completedLessons;
      setCompleted(Array.isArray(saved) ? saved.filter((item): item is string => typeof item === 'string') : []);
      setProgressReady(true);
    }).catch(() => {
      if (active) setProgressReady(true);
    });
    return () => { active = false; };
  }, [user]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) =>
    (subject === 'All subjects' || lesson.subject === subject) &&
    `${lesson.title} ${lesson.subject}`.toLowerCase().includes(query.toLowerCase())
  ), [subject, query]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError('');
    setBusy(true);
    try {
      if (mode === 'register') {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
        await setDoc(doc(db, 'users', credential.user.uid), {
          displayName: name.trim(), email: email.trim(), completedLessons: [], createdAt: serverTimestamp()
        }, { merge: true });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (error) {
      const code = (error as { code?: string }).code;
      const messages: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists. Try signing in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Choose a password with at least 6 characters.',
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/user-not-found': 'No account found. Create an account first.',
        'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
        'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase Console yet.',
        'auth/network-request-failed': 'Network error. Check your internet connection and try again.'
      };
      setAuthError(messages[code ?? ''] ?? 'Something went wrong. Please try again.');
    } finally { setBusy(false); }
  }

  async function toggleDone(title: string) {
    if (!user) return;
    const next = completed.includes(title) ? completed.filter((item) => item !== title) : [...completed, title];
    setCompleted(next);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName ?? '', email: user.email ?? '', completedLessons: next,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch {
      setCompleted(completed);
      setAuthError('Could not save your progress. Check your Firestore rules and internet connection.');
    }
  }

  if (!authReady) return <div className="auth-loading">Loading Pathshala AI…</div>;

  if (!user) return <main className="auth-screen">
    <section className="auth-card">
      <a className="brand auth-brand" href="#home"><span className="brand-mark"><GraduationCap size={23}/></span>pathshala<span className="brand-ai">.ai</span></a>
      <p className="eyebrow">YOUR PERSONAL LEARNING SPACE</p>
      <h1>{mode === 'register' ? 'Create your account' : 'Welcome back'}</h1>
      <p className="auth-subtitle">{mode === 'register' ? 'Start learning at your own pace.' : 'Sign in to continue your learning journey.'}</p>
      <form onSubmit={handleAuth} className="auth-form">
        {mode === 'register' && <label>Your name<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required maxLength={60}/></label>}
        <label>Email address<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required/></label>
        <label>Password<input type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required/></label>
        {authError && <p className="auth-error" role="alert">{authError}</p>}
        <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'} <ArrowRight size={17}/></button>
      </form>
      <p className="auth-switch">{mode === 'register' ? 'Already have an account?' : 'New to Pathshala?'} <button onClick={() => {setMode(mode === 'register' ? 'login' : 'register');setAuthError('');}}>{mode === 'register' ? 'Sign in' : 'Create account'}</button></p>
      <p className="auth-footnote">By continuing, you agree to use Pathshala responsibly. If you are under 18, ask a parent or guardian to help manage your account.</p>
    </section>
  </main>;

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
        <span className="user-label">{user.displayName || user.email}</span>
        <button className="signout-button" onClick={() => signOut(auth)} aria-label="Sign out"><LogOut size={16}/></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>
    <main id="home" className="page-wrap">
      <section className="welcome-row">
        <div><p className="eyebrow"><Sparkles size={14}/> YOUR LEARNING SPACE</p><h1>Learn something <span>new today.</span></h1><p className="welcome-copy">Welcome{user.displayName ? `, ${user.displayName}` : ''}. Small steps lead to big discoveries.</p></div>
        <div className="streak-card"><span className="streak-icon"><Flame size={21}/></span><div><strong>Keep it going</strong><span>{completed.length ? `${completed.length} lesson(s) completed` : 'Your learning journey starts here'}</span></div></div>
      </section>
      <section className="hero-card"><div className="hero-content"><span className="hero-kicker">A LITTLE PROGRESS EVERY DAY</span><h2>Your curiosity is<br/>your superpower.</h2><p>Explore topics, understand ideas, and learn at your own pace.</p><a className="hero-button" href="#learn">Explore lessons <ArrowRight size={17}/></a></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="book-art"><BookOpen size={76}/></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span></div></section>
      <section className="stats-grid" id="progress">
        <div className="stat-card"><span className="stat-icon purple"><BookOpen size={19}/></span><div><strong>{completed.length}</strong><span>Lessons completed</span></div></div>
        <div className="stat-card"><span className="stat-icon blue"><Clock3 size={19}/></span><div><strong>{completed.length * 12} min</strong><span>Learning time (estimate)</span></div></div>
        <div className="stat-card"><span className="stat-icon orange"><Target size={19}/></span><div><strong>1</strong><span>Learning goal</span></div></div>
      </section>
      {!progressReady && <p className="progress-note">Loading your saved progress…</p>}
      {authError && <p className="auth-error inline-error" role="alert">{authError}</p>}
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
