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
const transitionDirections = ['ltr', 'rtl', 'btt', 'ltr', 'rtl', 'btt'];

export default function HomePage() {
  const [comparisonValue, setComparisonValue] = useState(50);
  const [scrollRevealValue, setScrollRevealValue] = useState(0);
  const [isStickyNav, setIsStickyNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsStickyNav(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });

      gsap.fromTo(
        '.about-heading',
        { opacity: 0.2, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: '#about',
            start: 'top 88%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        '.about-line',
        { opacity: 0.15, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '#about',
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: true
          }
        }
      );

      ScrollTrigger.create({
        trigger: '#about',
        start: 'top top',
        onEnter: () =>
          gsap.to('.nav-shell', {
            scale: 0.985,
            backgroundColor: 'rgba(8, 12, 22, 0.9)',
            borderColor: 'rgba(255,255,255,0.45)',
            duration: 0.35,
            ease: 'power2.out'
          }),
        onLeaveBack: () =>
          gsap.to('.nav-shell', {
            scale: 1,
            backgroundColor: 'rgba(8, 12, 22, 0.82)',
            borderColor: 'rgba(255,255,255,0.3)',
            duration: 0.35,
            ease: 'power2.out'
          })
      });

      gsap.from('.showcase-card', {
        y: 44,
        opacity: 0,
        duration: 0.95,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '#video-showcase',
          start: 'top 78%'
        }
      });

      gsap.utils.toArray<HTMLElement>('.showcase-stage').forEach((stage) => {
        gsap.fromTo(
          stage,
          { y: 36, scale: 0.985, opacity: 0.85 },
          {
            y: -10,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: true
            }
          }
        );
      });

      let activeColor = sectionThemes[0];
      let moodTween: gsap.core.Tween | null = null;

      const setMood = (nextColor: string, direction: 'ltr' | 'rtl' | 'btt', sharp = false) => {
        if (nextColor === activeColor) return;
        const axis =
          direction === 'rtl'
            ? { xPercent: 100, yPercent: 0 }
            : direction === 'btt'
              ? { xPercent: 0, yPercent: 100 }
              : { xPercent: -100, yPercent: 0 };
        gsap.set('#mood-wipe', { backgroundColor: nextColor, opacity: 1, ...axis });
        moodTween?.kill();
        moodTween = gsap.to('#mood-wipe', {
          xPercent: 0,
          yPercent: 0,
          duration: sharp ? 0.26 : 0.62,
          ease: sharp ? 'power2.out' : 'power3.out',
          overwrite: true,
          onComplete: () => {
            gsap.set('#mood-base', { backgroundColor: nextColor });
            gsap.to('#mood-wipe', { opacity: 0, duration: 0.28, ease: 'power1.out' });
            activeColor = nextColor;
          }
        });
      };

      gsap.utils.toArray<HTMLElement>('.theme-section').forEach((section, index) => {
        const nextColor = section.dataset.bg ?? '#ffffff';
        const direction = transitionDirections[index % transitionDirections.length] as 'ltr' | 'rtl' | 'btt';
        ScrollTrigger.create({
          trigger: section,
          start: 'top 98%',
          end: 'bottom 45%',
          onEnter: () => setMood(nextColor, direction, index === 2),
          onEnterBack: () => setMood(nextColor, direction, index === 2)
        });
      });

      ScrollTrigger.create({
        trigger: '#image-transform',
        start: 'top 80%',
        end: 'bottom 25%',
        scrub: true,
        onUpdate: (self) => setScrollRevealValue(Math.round(self.progress * 100))
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-14">
      <div id="mood-base" className="pointer-events-none fixed inset-0 -z-20 bg-[#F3F0EA]" />
      <div id="mood-wipe" className="pointer-events-none fixed inset-0 -z-10 opacity-0" />

      <header className={`pointer-events-none inset-x-0 z-50 flex justify-center px-5 transition-all duration-300 ${isStickyNav ? 'fixed top-0' : 'absolute top-0'}`}>
        <nav className="nav-shell pointer-events-auto flex w-full max-w-[1080px] items-center justify-between rounded-[999px] border border-white/30 bg-[#080d16]/82 px-4 py-3 shadow-[0_18px_60px_rgba(4,8,18,0.45)] backdrop-blur-2xl md:px-6">
          <p className="heading-cinematic text-sm font-semibold text-slate-100">MA STUDIO</p>
          <ul className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full border border-transparent px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-200 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section id="hero" className="theme-section section-shell section-spacing pt-32 md:pt-36" data-bg={sectionThemes[0]}>
        <div className="hero-content mx-auto max-w-4xl text-center">
          <h1 className="heading-cinematic mt-2 text-5xl font-semibold leading-tight text-slate-900 md:text-7xl">Real work. Clear playback. Cinematic progression.</h1>
          <p className="description-elegant mt-2 text-xl text-slate-700 md:text-2xl">{profile.name} — {profile.role}</p>
          <p className="description-elegant mx-auto mt-4 max-w-3xl text-lg text-slate-700 md:text-xl">
            Each section introduces a distinct visual world with smooth mood transitions while keeping media large and watchable.
          </p>
        </div>
        <div className="showcase-stage mt-10 rounded-[2rem] border border-white/15 bg-[#080d18] p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Opening Visual</p>
          <h2 className="mt-3 text-2xl font-medium text-slate-100 md:text-3xl">{heroShowcase.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">{heroShowcase.description}</p>
          <video className="mt-5 w-full rounded-[1.2rem] border border-white/10 bg-black object-cover" controls preload="metadata" playsInline src={heroShowcase.src} />
        </div>
      </section>

      <section id="about" className="theme-section section-shell section-spacing" data-bg={sectionThemes[2]}>
        <p className="kicker text-slate-300">About</p>
        <h2 className="about-heading heading-cinematic mt-5 max-w-4xl text-3xl font-semibold leading-tight text-slate-100 md:text-5xl">A deliberate visual storyteller focused on cinematic pacing.</h2>
        <div className="description-elegant mt-10 space-y-3 text-2xl leading-[1.25] text-slate-300 md:text-3xl">
          {revealLines.map((line) => (
            <p key={line} className="about-line">{line}</p>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="kicker text-slate-300">Identity</p>
            <h3 className="heading-signature mt-5 text-5xl leading-tight text-slate-100 md:text-7xl">{profile.name}</h3>
            <p className="description-elegant mt-3 text-xl text-slate-300 md:text-2xl">{profile.role}</p>
            <p className="description-elegant mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{profile.about}</p>
            <p className="description-elegant mt-4 text-base text-slate-400 md:text-lg">A focused editorial identity block built around clarity, tone, and cinematic presence.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-[74%] w-[72%] rounded-[2.5rem] bg-red-200/80" />
            <div className="absolute -bottom-6 right-0 h-[48%] w-[45%] rounded-[2rem] bg-yellow-100/70" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/25 shadow-[0_26px_90px_rgba(13,18,34,0.25)]">
            <Image
              src={portraitImage}
              alt="Mohamed Ahmed portrait"
              width={1100}
              height={1400}
              className="h-[620px] w-full object-cover object-top"
            />
            </div>
            <p className="description-elegant mt-4 text-sm text-slate-400">Portrait</p>
          </div>
        </div>
      </section>

      <section id="image-transform" className="theme-section section-shell section-spacing" data-bg={sectionThemes[0]}>
        <p className="kicker text-slate-700">Image Comparison</p>
        <h3 className="heading-cinematic mt-5 max-w-3xl text-3xl font-semibold text-slate-900 md:text-5xl">{imageComparison.title}</h3>
        <p className="description-elegant mt-3 max-w-3xl text-lg text-slate-700 md:text-xl">{imageComparison.description}</p>

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
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - comparisonValue}% 0 0)` }}>
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
        {videoShowcase.map((item, index) => {
          return (
            <article
              key={item.title}
              className="theme-section showcase-card showcase-stage mb-10 rounded-[2rem] border border-white/15 bg-[#080d18] p-5 md:p-7"
              data-bg={sectionThemes[(index + 1) % sectionThemes.length]}
            >
              <h4 className="heading-cinematic mt-3 text-2xl font-medium text-slate-100 md:text-3xl">{item.title}</h4>
              <p className="description-elegant mt-2 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">{item.description}</p>
              {'credit' in item && item.credit ? <p className="mt-2 text-xs text-slate-400">{item.credit}</p> : null}
              <video className="mt-5 w-full rounded-[1.2rem] border border-white/10 bg-black object-cover" controls preload="metadata" playsInline src={item.src} />
            </article>
          );
        })}
      </section>

      <section id="contact" className="theme-section section-shell section-spacing pb-32" data-bg={sectionThemes[5]}>
        <div className="rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 md:p-14">
          <p className="kicker text-slate-700">Contact</p>
          <h3 className="heading-cinematic mt-5 text-3xl font-semibold text-slate-900 md:text-5xl">Let&apos;s create your next cinematic piece.</h3>
          <div className="mt-8 space-y-3 text-base text-slate-700 md:text-lg">
            <a
              href="mailto:mohmaedelhosary@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-slate-500/40 bg-white/30 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-700/60 hover:bg-white/55"
            >
              <Mail className="h-4 w-4" />
              mohmaedelhosary@gmail.com
            </a>
            <a
              href="https://wa.me/9010987922"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-slate-500/40 bg-white/30 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-700/60 hover:bg-white/55"
            >
              <Phone className="h-4 w-4" />
              WhatsApp / +9010987922
            </a>
            <a
              href="https://www.instagram.com/mamdou.amadu/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-slate-500/40 bg-white/30 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-700/60 hover:bg-white/55"
            >
              <Instagram className="h-4 w-4" />
              @mamdou.amadu
            </a>
          </div>
          <form className="mt-10 grid gap-4 rounded-[1.8rem] border border-white/20 bg-white/20 p-5 md:grid-cols-2 md:p-6">
            <input
              type="text"
              placeholder="Name"
              className="rounded-xl border border-slate-400/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-600 focus:border-slate-700/60"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-xl border border-slate-400/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-600 focus:border-slate-700/60"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-slate-400/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-600 focus:border-slate-700/60 md:col-span-2"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="rounded-xl border border-slate-400/30 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-600 focus:border-slate-700/60 md:col-span-2"
            />
            <button
              type="button"
              className="heading-cinematic rounded-full border border-slate-700/40 bg-[#101b2f] px-6 py-3 text-sm text-slate-100 transition hover:bg-[#152845] md:col-span-2 md:w-fit"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
