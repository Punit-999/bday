import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowDown, ArrowLeft, ArrowRight, CakeSlice, ChevronDown, Gift, Heart, Image as ImageIcon, LockKeyhole, Music2, Pause, Play, Sparkles, Volume2, X } from 'lucide-react';
import { siteConfig } from '../config/site.js';

const reasonSeeds = [
  ['your steady love', 'you make every room feel safer'],
  ['the way you listen', 'you make our stories feel important'],
  ['your brave heart', 'you turn hard days into hopeful ones'],
  ['your warm hugs', 'they still feel like home'],
  ['your gentle patience', 'you give people room to become themselves'],
  ['your honest advice', 'it always arrives with kindness'],
  ['your delicious little traditions', 'you make ordinary moments memorable'],
  ['your generous spirit', 'you notice what everyone else needs'],
  ['your laugh', 'it makes joy feel contagious'],
  ['your quiet strength', 'you keep showing up with grace'],
  ['your thoughtful surprises', 'you find magic in the smallest details'],
  ['your bright optimism', 'you help us look for the light'],
  ['your comforting presence', 'you never make anyone face a storm alone'],
  ['your beautiful faith in us', 'you see potential before we can see it'],
  ['your calm wisdom', 'you make tangled things feel clear'],
  ['your playful side', 'you remind us never to take life too seriously'],
  ['your open kitchen', 'it has always been a place to belong'],
  ['your tender memory', 'you remember the moments we thought were small'],
  ['your thoughtful questions', 'you care about the person behind the answer'],
  ['your creative hands', 'you make beauty wherever you go'],
  ['your dependable promises', 'we know your word means something'],
  ['your wholehearted celebrations', 'you make everyone feel worth cheering for'],
  ['your ability to forgive', 'you leave room for love to grow'],
  ['your soft goodnights', 'they make every day end gently'],
  ['your one-of-a-kind soul', 'there will never be another you'],
];
const reasonEndings = ['you make us feel loved', 'you are our favorite kind of magic', 'you make life more beautiful', 'you are the heart of our happiest memories'];
const reasons = reasonSeeds.flatMap(([subject, impact]) => reasonEndings.map((ending, i) => `Because of ${subject}, ${impact}; ${ending}.`)).slice(0, 100);

const gardenNotes = [
  ['🌷', 'The Tender Bloom', 'Thank you for making softness feel strong.'],
  ['🌸', 'The Joy Bloom', 'Your joy has a way of finding everyone in the room.'],
  ['🌼', 'The Golden Bloom', 'You bring a little sunshine to every ordinary day.'],
  ['🌺', 'The Brave Bloom', 'You teach us that courage can be warm and gentle.'],
  ['🪻', 'The Dream Bloom', 'You make space for every dream to take root.'],
  ['🌹', 'The Forever Bloom', 'Some loves only get more beautiful with time.'],
];
const notes = [
  { icon: Heart, eyebrow: 'A soft truth', title: 'You make love look easy.', body: 'Not because life is always easy, but because you meet every season with a heart that keeps choosing care.' },
  { icon: Sparkles, eyebrow: 'A little reminder', title: 'You are allowed to be celebrated.', body: 'Today is not about all the things you do for everyone else. It is a day for the world to pause and say: we see you.' },
  { icon: Volume2, eyebrow: 'A wish for you', title: 'May this year feel like exhale.', body: 'More slow mornings, more belly laughs, more moments that belong only to you, and every good thing returning home.' },
];

function useMediaManifest(path, fallback = []) {
  const [items, setItems] = useState(fallback);
  useEffect(() => {
    fetch(path).then((r) => r.ok ? r.json() : []).then((data) => Array.isArray(data) && setItems(data)).catch(() => {});
  }, [path]);
  return items;
}

function formatTitle(file) { return file.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); }
function renderLetter(markdown) {
  return markdown.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-2" />;
    if (line.startsWith('# ')) return <h3 key={i}>{line.slice(2)}</h3>;
    if (line.startsWith('## ')) return <h3 key={i}>{line.slice(3)}</h3>;
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return <p key={i}>{parts.map((part, j) => part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part.startsWith('*') ? <em key={j}>{part.slice(1, -1)}</em> : part)}</p>;
  });
}

function LoadingScreen() {
  return <div className="loading-screen" role="status" aria-label="Preparing Charu’s birthday garden"><div className="loading-mark"><Sparkles size={28} /></div></div>;
}

function SectionHeading({ eyebrow, title, body }) {
  return <div className="section-heading"><div className="eyebrow">{eyebrow}</div><h2 className="display-font">{title}</h2>{body && <p>{body}</p>}</div>;
}

function PhotoJourney({ photos }) {
  const [mode, setMode] = useState('mosaic');
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => { if (mode !== 'slideshow' || photos.length < 2) return undefined; const id = setInterval(() => setActive((x) => (x + 1) % photos.length), 4500); return () => clearInterval(id); }, [mode, photos.length]);
  const go = (dir) => setActive((x) => (x + dir + photos.length) % photos.length);
  return <section id="photos" className="section-pad"><div className="section-shell"><div className="photo-stage"><div className="photo-intro"><SectionHeading eyebrow="Chapter one · The memory room" title={<>Every little moment, <em>held close.</em></>} body="Drop your photos into one folder. This room rearranges itself into a soft, cinematic story — no captions or layouts to manage." /><div className="story-strip"><div className="story-stat glass"><strong>{photos.length || '∞'}</strong><span>memories waiting</span></div><div className="story-stat glass"><strong>01</strong><span>love story</span></div><div className="story-stat glass"><strong>∞</strong><span>reasons to smile</span></div></div></div><div><div className="photo-toolbar"><div className="eyebrow">A living album</div><div className="mode-pills" aria-label="Photo viewing modes">{[['mosaic', 'Mosaic'], ['slideshow', 'Slideshow']].map(([value, label]) => <button key={value} className={`pill-button ghost ${mode === value ? 'active' : ''}`} onClick={() => setMode(value)}>{label}</button>)}</div></div>{mode === 'slideshow' ? <div className="slideshow">{photos.map((photo, i) => <AnimatePresence mode="wait" key={photo.file}><motion.button className="photo-card" initial={{ opacity: 0 }} animate={{ opacity: i === active ? 1 : 0 }} exit={{ opacity: 0 }} transition={{ duration: .6 }} onClick={() => setLightbox(photo)} aria-label={`View ${photo.title || formatTitle(photo.file)}`}><img src={photo.file} alt={photo.title || 'A cherished birthday memory'} /><span className="photo-caption">{photo.title || formatTitle(photo.file)}</span></motion.button></AnimatePresence>)}<div className="slide-controls"><button onClick={() => go(-1)} aria-label="Previous photo"><ArrowLeft size={19} /></button><span className="slide-count">{active + 1} / {photos.length}</span><button onClick={() => go(1)} aria-label="Next photo"><ArrowRight size={19} /></button></div></div> : <div className="photo-grid">{photos.slice(0, 3).map((photo) => <motion.button layout whileHover={{ y: -4 }} key={photo.file} className="photo-card" onClick={() => setLightbox(photo)} aria-label={`View ${photo.title || formatTitle(photo.file)}`}><img src={photo.file} alt={photo.title || 'A cherished birthday memory'} /><span className="photo-caption">{photo.title || formatTitle(photo.file)}</span></motion.button>)}</div>}</div></div></div>{lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo viewer"><X size={20} /></button><img src={lightbox.file} alt={lightbox.title || 'A cherished birthday memory'} onClick={(e) => e.stopPropagation()} /></div>}</section>;
}

function Reasons() {
  const [count, setCount] = useState(6);
  return <section id="reasons" className="section-pad"><div className="section-shell"><SectionHeading eyebrow="Chapter two · The love list" title={<>100 reasons. <em>One impossible love.</em></>} body="A little constellation of the things we notice, cherish, and carry with us because of you." /><div className="reasons-wrap">{reasons.slice(0, count).map((reason, i) => <motion.article key={reason} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ delay: (i % 3) * .06 }} className="reason-card glass"><div className="reason-no">REASON {String(i + 1).padStart(2, '0')}</div><p>{reason}</p></motion.article>)}</div><div className="reasons-load">{count < reasons.length ? <button className="pill-button secondary" onClick={() => setCount((x) => Math.min(x + 6, reasons.length))}>Reveal six more <ChevronDown size={17} /></button> : <div className="eyebrow">All 100, kept forever</div>}</div></div></section>;
}

function GratitudeGarden() {
  const [active, setActive] = useState(0);
  return <section id="garden" className="section-pad"><div className="section-shell"><div className="garden"><SectionHeading eyebrow="Chapter three · The gratitude garden" title={<>Tap a bloom. <em>Hear what it says.</em></>} body="Every flower holds a tiny thank-you — for the ways you make a life feel loved." /><div className="flower-grid">{gardenNotes.map(([glyph, name], i) => <motion.button whileTap={{ scale: .96 }} whileHover={{ y: -4 }} className={`flower-button ${active === i ? 'active' : ''}`} key={name} onClick={() => setActive(i)} aria-pressed={active === i}><span className="flower-glyph">{glyph}</span><span>{name}</span></motion.button>)}</div><AnimatePresence mode="wait"><motion.div key={active} className="garden-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{gardenNotes[active][2]}</motion.div></AnimatePresence></div></div></section>;
}

function Appreciation() {
  return <section className="section-pad"><div className="section-shell"><SectionHeading eyebrow="Chapter four · A few soft truths" title={<>For every version of <em>you.</em></>} body="The one who gives, the one who dreams, the one who keeps going — every version deserves a little celebration." /><div className="note-grid">{notes.map(({ icon: Icon, eyebrow, title, body }) => <motion.article key={title} className="note-card glass" whileHover={{ y: -6 }}><div className="note-icon"><Icon size={18} /></div><div className="eyebrow" style={{ marginTop: 18 }}>{eyebrow}</div><h3>{title}</h3><p>{body}</p></motion.article>)}</div></div></section>;
}

function AudioRoom({ audio }) {
  const [playing, setPlaying] = useState(null);
  const refs = useRef({});
  const toggle = (file) => { const el = refs.current[file]; if (!el) return; if (playing === file) { el.pause(); setPlaying(null); } else { Object.values(refs.current).forEach((audioEl) => audioEl?.pause()); el.play().then(() => setPlaying(file)).catch(() => {}); } };
  return <section id="voices" className="section-pad"><div className="section-shell"><SectionHeading eyebrow="Chapter five · Voices of love" title={<>The words you can <em>play back.</em></>} body="Add voice notes or a song to public/audio. Each file becomes a calm little listening room automatically." /><div className="audio-list">{audio.length ? audio.map((item) => <div className="audio-card glass" key={item.file}><button className="audio-play" onClick={() => toggle(item.file)} aria-label={`${playing === item.file ? 'Pause' : 'Play'} ${item.title || formatTitle(item.file)}`}>{playing === item.file ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}</button><div><p className="audio-title">{item.title || formatTitle(item.file)}</p><div className={`wave ${playing === item.file ? 'playing' : ''}`} aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <i key={i} />)}</div></div><audio ref={(el) => { refs.current[item.file] = el; }} src={item.file} onEnded={() => setPlaying(null)} /></div>) : <div className="empty-state"><Music2 size={22} /><strong>Your listening room is waiting.</strong><span>Drop an MP3, voice note, or birthday song into <b>public/audio/</b> and it will appear here.</span></div>}</div></div></section>;
}

function SecretGift({ letter }) {
  const [open, setOpen] = useState(false);
  return <section id="letter" className="section-pad"><div className="section-shell"><div className="gift-stage"><div className="gift-area"><div><div className="eyebrow" style={{ textAlign: 'center' }}>A secret, wrapped</div><motion.button className={`gift-box ${open ? 'open' : ''}`} onClick={() => setOpen(true)} whileHover={{ y: -5 }} whileTap={{ scale: .97 }} aria-label="Open your birthday letter"><div className="gift-bow" /><div className="gift-lid" /><div className="gift-body" /><div className="gift-ribbon-v" /><div className="gift-ribbon-h" /></motion.button><p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.8rem' }}>{open ? 'Your letter is open.' : 'Tap the gift to open your letter.'}</p></div></div><AnimatePresence mode="wait"><motion.div key={open ? 'open' : 'closed'} className="letter-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>{open ? <><div className="eyebrow">From the heart</div>{renderLetter(letter)}</> : <><LockKeyhole size={22} color="#c99d5e" /><h3 className="display-font">There is a little something inside.</h3><p>One click, and a letter written only for you will unfold.</p><button className="pill-button primary" onClick={() => setOpen(true)}>Open the secret <Gift size={17} /></button></>}</motion.div></AnimatePresence></div></div></section>;
}

function BirthdayCake({ audio }) {
  const [blown, setBlown] = useState(false);
  const celebrate = () => { setBlown(true); confetti({ particleCount: 170, spread: 90, origin: { y: .7 }, colors: ['#d88fae', '#c99d5e', '#a886bf', '#fff1c3'] }); const source = siteConfig.musicFile || audio[0]?.file; if (source) { const song = new Audio(source); song.volume = .55; song.play().catch(() => {}); } };
  return <section className="section-pad"><div className="section-shell"><div className={`cake-section ${blown ? 'blown' : ''}`}><div className="eyebrow">The birthday moment</div><div className="cake-stage"><div className="candle"><span className="flame" /></div><div className="candle"><span className="flame" /></div><div className="candle"><span className="flame" /></div><div className="cake-icing" /><div className="cake-tier top" /><div className="cake-tier bottom" /></div><h3 className="display-font">Make a wish, {siteConfig.motherName}.</h3><p>{blown ? 'And may the year ahead be as luminous as you are.' : 'Close your eyes, keep one beautiful wish close, and tap when you are ready.'}</p>{!blown && <button className="pill-button primary" onClick={celebrate}>Make a wish <Sparkles size={17} /></button>}{blown && <div className="eyebrow">Wish sent into the universe</div>}</div></div></section>;
}

function Finale() {
  return <section className="final-section"><div className="heart-rain" aria-hidden="true">{[1, 2, 3, 4].map((i) => <span key={i} className="heart" style={{ animationDuration: `${7 + i}s` }}>♥</span>)}</div><span className="firework one" /><span className="firework two" /><span className="firework three" /><div className="section-shell"><div className="eyebrow">And the story continues</div><h2 className="display-font">Happy birthday, <em>{siteConfig.motherName}.</em></h2><p>{siteConfig.finalMessage} Today, tomorrow, and in every little moment still to come.</p><div style={{ marginTop: 28 }}><Heart size={22} fill="#d98eaa" color="#d98eaa" /></div></div></section>;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [letter, setLetter] = useState('');
  const photos = useMediaManifest('/generated/photos.json', [{ file: '/photos/01-your-first-memory.svg', title: 'Your first memory' }, { file: '/photos/02-the-little-things.svg', title: 'The little things' }, { file: '/photos/03-always-home.svg', title: 'Always home' }]);
  const audio = useMediaManifest('/generated/audio.json', []);
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1100); fetch('/content/letter.md').then((r) => r.text()).then(setLetter).catch(() => setLetter('# Dear Charu,\n\nYou are loved beyond words.')); return () => clearTimeout(timer); }, []);
  const entrance = useMemo(() => !loading && !entered, [loading, entered]);
  return <div className="app-shell">{loading && <LoadingScreen />}{entrance && <div className="hero"><div className="hero-inner"><div className="hero-nav"><div className="wordmark"><span className="wordmark-mark">✦</span> Charu’s birthday garden</div><a href="#photos">Enter the garden <ArrowDown size={14} /></a></div><div className="hero-copy"><div className="eyebrow">A little world made of love</div><h1 className="display-font">Happy birthday <em>{siteConfig.motherName}.</em></h1><p className="hero-sub">A cinematic garden of memories, gratitude, and all the reasons your love has made life more beautiful.</p><div className="hero-cta-row"><button className="pill-button primary" onClick={() => { setEntered(true); setTimeout(() => document.getElementById('photos')?.scrollIntoView(), 80); }}>Open your surprise <Sparkles size={17} /></button><a className="pill-button secondary" href="#photos">Take a peek <ArrowDown size={16} /></a></div><div className="hero-signature"><span /> Made for the woman who makes every place feel like home</div></div><div className="floating-orb orb-one" aria-hidden="true">✿</div><div className="floating-orb orb-two" aria-hidden="true">✦</div><div className="floating-orb orb-three" aria-hidden="true">♡</div><div className="scroll-cue">begin</div></div></div>}{!loading && !entrance && <><PhotoJourney photos={photos} /><Reasons /><GratitudeGarden /><Appreciation /><AudioRoom audio={audio} /><SecretGift letter={letter} /><BirthdayCake audio={audio} /><Finale /><footer className="section-shell footer"><span>Made with a little extra love for {siteConfig.motherName}</span><span>✦ happy birthday</span></footer></>}</div>;
}
