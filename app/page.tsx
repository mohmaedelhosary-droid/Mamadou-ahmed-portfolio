'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroShowcase, imageComparison, portraitImage, profile, revealLines, videoShowcase } from '@/data/content';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Intro', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Compare', href: '#image-transform' },
  { label: 'Showcase', href: '#video-showcase' },
  { label: 'Contact', href: '#contact' }
];

const sectionThemes = ['#F3F0EA', '#6B1F2B', '#0B0B0D', '#203730', '#1E3F66', '#6E7278', '#6A571D'];

export default function HomePage() {
  const [comparisonValue, setComparisonValue] = useState(50);
  const [scrollRevealValue, setScrollRevealValue] = useState(0);
  const [isStickyNav, setIsStickyNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsStickyNav(window.scrollY > 8);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
      setScrollRevealValue(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0.18, filter: 'blur(6px)', y: 32 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 72%',
            end: 'bottom 45%',
            scrub: true
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.theme-section').forEach((section) => {
        const bg = section.dataset.bg;
        if (!bg) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => gsap.to('body', { backgroundColor: bg, duration: 0.45, ease: 'power2.out' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: bg, duration: 0.45, ease: 'power2.out' })
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-14">
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-5">
        <nav
          className={`nav-shell pointer-events-auto flex w-full max-w-[1060px] items-center justify-between rounded-full border px-5 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 md:px-7 ${
            isStickyNav ? 'border-white/25 bg-black/70' : 'border-white/15 bg-black/45'
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-slate-200">MA Studio</p>
          <ul className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section id="hero" className="theme-section section-shell section-spacing pt-32 md:pt-36" data-bg={sectionThemes[0]}>
        <div className="hero-content mx-auto max-w-4xl text-center">
          <h1 className="heading-cinematic mt-2 text-5xl font-semibold leading-tight text-slate-900 md:text-7xl">
            Real work. Clear playback. Cinematic progression.
          </h1>
          <p className="description-elegant mt-2 text-xl text-slate-700 md:text-2xl">
            {profile.name} — {profile.role}
          </p>
          <p className="description-elegant mx-auto mt-4 max-w-3xl text-lg text-slate-700 md:text-xl">
            Each section introduces a distinct visual world with smooth mood transitions while keeping media large and watchable.
          </p>
        </div>

        <div className="showcase-stage mt-10 rounded-[2rem] border border-white/15 bg-[#080d18] p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Opening Visual</p>
          <h2 className="mt-3 text-2xl font-medium text-slate-100 md:text-3xl">{heroShowcase.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">{heroShowcase.description}</p>
          <video
            className="mt-5 w-full rounded-[1.2rem] border border-white/10 bg-black object-cover"
            controls
            preload="metadata"
            playsInline
            src={heroShowcase.src}
          />
        </div>
      </section>

      <section id="about" className="theme-section section-shell section-spacing" data-bg={sectionThemes[2]}>
        <p className="kicker text-haze">About</p>
        <h2 className="about-reveal mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] text-white md:text-7xl">
          A deliberate visual storyteller focused on cinematic pacing.
        </h2>

        <div className="mt-10 space-y-4 text-2xl font-medium leading-[1.3] text-white md:text-4xl">
          {revealLines.map((line) => (
            <p key={line} className="about-reveal">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="identity" className="theme-section section-shell section-spacing min-h-screen" data-bg={sectionThemes[2]}>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker text-haze">Identity</p>
            <h3 className="mt-5 font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
              {profile.name}
            </h3>
            <p className="mt-3 text-lg text-slate-300 md:text-2xl">{profile.role}</p>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl">{profile.about}</p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
              Main editing workflow includes DaVinci Resolve for editing, color grading, and cinematic finishing.
            </p>
          </div>

          <div className="relative">
            <div id="identity-block" className="absolute -right-8 -top-8 h-[70%] w-[70%] rounded-[4rem] bg-indigo-500/35 opacity-70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15">
              <Image
                src={portraitImage}
                alt={`${profile.name} portrait`}
                width={1100}
                height={1400}
                className="identity-media h-[640px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="image-transform" className="theme-section section-shell section-spacing" data-bg={sectionThemes[1]}>
        <p className="kicker text-slate-700">Image Comparison</p>
        <h3 className="heading-cinematic mt-5 max-w-3xl text-3xl font-semibold text-slate-900 md:text-5xl">
          {imageComparison.title}
        </h3>
        <p className="description-elegant mt-3 max-w-3xl text-lg text-slate-700 md:text-xl">
          {imageComparison.description}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.8rem] border border-white/40 bg-[#090d18] p-4 md:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10">
              <Image
                src={imageComparison.beforeImage}
                alt="Before original version"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />

              <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${comparisonValue}%)` }}>
                <Image
                  src={imageComparison.afterImage}
                  alt="After graded version"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>

              <div className="pointer-events-none absolute inset-y-0" style={{ left: `${comparisonValue}%` }}>
                <div className="h-full w-[2px] bg-white/90" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-300">
              <span>Before</span>
              <span>After</span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={comparisonValue}
              onChange={(event) => setComparisonValue(Number(event.target.value))}
              aria-label="Before and after image comparison slider"
              className="mt-4 w-full accent-slate-200"
            />
          </article>

          <article className="rounded-[1.8rem] border border-white/40 bg-[#090d18] p-4 md:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/50">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-y-0" style={{ left: `${scrollRevealValue}%` }}>
                <div className="h-full w-[2px] bg-white/60" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Before</span>
              <span>After</span>
            </div>
          </article>
        </div>
      </section>

      <section id="video-showcase" className="section-shell section-spacing">
        {videoShowcase.map((item, index) => (
          <div
            key={item.title}
            className="theme-section showcase-card showcase-stage mb-10 rounded-[2rem] border border-white/15 bg-[#080d18] p-5 md:p-7"
            data-bg={sectionThemes[(index + 3) % sectionThemes.length]}
          >
            <h4 className="heading-cinematic mt-3 text-2xl font-medium text-slate-100 md:text-3xl">
              {item.title}
            </h4>

            <p className="description-elegant mt-2 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {item.description}
            </p>

            {'credit' in item && item.credit ? (
              <p className="mt-2 text-xs text-slate-400">{item.credit}</p>
            ) : null}

            <video
              className="mt-5 w-full rounded-[1.2rem] border border-white/10 bg-black object-cover"
              controls
              preload="metadata"
              playsInline
              src={item.src}
            />
          </div>
        ))}
      </section>

      <section id="contact" className="theme-section section-shell section-spacing pb-32" data-bg={sectionThemes[5]}>
        <div className="rounded-[2.8rem] border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-10 md:p-16">
          <p className="kicker text-haze">Contact</p>
          <h3 className="heading-cinematic mt-5 text-4xl font-semibold text-white md:text-6xl">
            Let&apos;s create your next cinematic piece.
          </h3>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-800">
            <a href="mailto:mohmaedelhosary@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <Mail className="h-4 w-4" /> mohmaedelhosary@gmail.com
            </a>
            <a href="https://wa.me/9010987922" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <Phone className="h-4 w-4" /> WhatsApp / +9010987922
            </a>
            <a href="https://www.instagram.com/mamdou.amadu/?hl=en" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <Instagram className="h-4 w-4" /> @mamdou.amadu
            </a>
          </div>

          <form className="mt-10 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-slate-400" placeholder="Name" />
            <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-slate-400" placeholder="Email" type="email" />
            <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-slate-400 md:col-span-2" placeholder="Phone number" />
            <textarea className="min-h-32 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-slate-400 md:col-span-2" placeholder="Message" />
            <button type="button" className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 md:col-span-2">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
