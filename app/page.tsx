'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imageComparison, profile, revealLines, videoShowcase } from '@/data/content';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Intro', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Identity', href: '#identity' },
  { label: 'Videos', href: '#video-showcase' },
  { label: 'Contact', href: '#contact' }
];

export default function HomePage() {
  const [comparisonValue, setComparisonValue] = useState(50);

  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });

      gsap.to('.nav-shell', {
        width: 'min(860px, 92vw)',
        backgroundColor: 'rgba(3, 6, 12, 0.64)',
        borderColor: 'rgba(255,255,255,0.28)',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 88%',
          end: 'top 18%',
          scrub: true
        }
      });

      gsap.from('.media-card', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#video-showcase',
          start: 'top 75%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-14">
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5">
        <nav className="nav-shell pointer-events-auto flex w-full max-w-[1060px] items-center justify-between rounded-full border border-white/15 bg-black/40 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">
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

      <section id="hero" className="section-shell section-spacing pt-32 md:pt-36">
        <div className="hero-content mx-auto max-w-4xl text-center">
          <p className="kicker">Cinematic Showcase</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">Featured Work: Lake</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 md:text-base">A cinematic landscape shot focused on calm motion, natural light, and color mood.</p>
        </div>
        <article className="media-card mt-10 overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0f1c] p-4 md:p-6">
          <video className="w-full rounded-[1.3rem] object-cover" autoPlay muted loop playsInline preload="metadata" src={videoShowcase[0].src} />
        </article>
      </section>

      <section id="about" className="section-shell section-spacing relative">
        <p className="kicker">About</p>
        <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">A deliberate visual storyteller focused on cinematic pacing.</h2>
        <div className="mt-10 space-y-3 text-lg leading-[1.35] text-slate-300 md:text-2xl">
          {revealLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section id="identity" className="section-shell section-spacing transition-colors duration-700">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker">Identity</p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">{profile.name}</h3>
            <p className="mt-3 text-base text-slate-300 md:text-xl">{profile.role}</p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{profile.about}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15">
            <Image
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1300&q=80"
              alt="portrait"
              width={1100}
              height={1400}
              className="h-[560px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="image-transform" className="section-shell section-spacing">
        <p className="kicker">Image Comparison</p>
        <h3 className="mt-5 max-w-3xl text-3xl font-semibold text-white md:text-5xl">{imageComparison.title}</h3>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">{imageComparison.description}</p>
        <article className="mt-10 rounded-[1.8rem] border border-white/15 bg-[#090d18] p-4 md:p-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/10">
            <Image
              src={imageComparison.afterImage}
              alt="After graded version"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - comparisonValue}% 0 0)` }}>
              <Image
                src={imageComparison.beforeImage}
                alt="Before original version"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${comparisonValue}%` }}>
              <div className="h-full w-[2px] bg-white/80" />
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
          <div className="mt-2 text-xs text-slate-400">Drag the slider to compare the original and final graded image.</div>
        </article>
      </section>

      <section id="video-showcase" className="section-shell section-spacing">
        <p className="kicker">Video Showcase</p>
        <h3 className="mt-5 max-w-4xl text-3xl font-semibold text-white md:text-5xl">Featured works with clear, watchable presentation.</h3>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {videoShowcase.map((item, index) => (
            <article key={item.title} className="media-card rounded-[1.8rem] border border-white/15 bg-[#090d18] p-4 md:p-5">
              <video
                className="w-full rounded-[1.1rem] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src={item.src}
              />
              <h4 className="mt-4 text-lg font-medium text-slate-100 md:text-xl">
                {index + 1}. {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell section-spacing pb-32">
        <div className="rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 md:p-14">
          <p className="kicker">Contact</p>
          <h3 className="mt-5 text-3xl font-semibold text-white md:text-5xl">Let&apos;s build your next cinematic story.</h3>
          <div className="mt-8 space-y-4 text-base text-slate-200 md:text-lg">
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-haze" /> mohmaedelhosary@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-haze" /> +9010987922
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
