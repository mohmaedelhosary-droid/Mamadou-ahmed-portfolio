'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroShowcase, imageComparison, profile, revealLines, videoShowcase } from '@/data/content';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Intro', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Compare', href: '#image-transform' },
  { label: 'Showcase', href: '#video-showcase' },
  { label: 'Contact', href: '#contact' }
];

const sectionThemes = ['#060910', '#0a1120', '#11182b', '#1a1325', '#101f2a', '#201116', '#121620', '#0b1b23'];

export default function HomePage() {
  const [comparisonValue, setComparisonValue] = useState(50);

  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });

      gsap.to('.nav-shell', {
        width: 'min(900px, 94vw)',
        backgroundColor: 'rgba(3, 6, 12, 0.72)',
        borderColor: 'rgba(255,255,255,0.28)',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 88%',
          end: 'top 15%',
          scrub: true
        }
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

      gsap.utils.toArray<HTMLElement>('.theme-section').forEach((section) => {
        const nextColor = section.dataset.bg ?? '#070b14';
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => gsap.to('body', { backgroundColor: nextColor, duration: 0.8, overwrite: 'auto' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: nextColor, duration: 0.8, overwrite: 'auto' })
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-14">
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5">
        <nav className="nav-shell pointer-events-auto flex w-full max-w-[1080px] items-center justify-between rounded-full border border-white/15 bg-black/40 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">
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
          <p className="kicker">Cinematic Portfolio</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">Real work. Clear playback. Cinematic progression.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
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

      <section id="about" className="theme-section section-shell section-spacing" data-bg={sectionThemes[1]}>
        <p className="kicker">About</p>
        <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">A deliberate visual storyteller focused on cinematic pacing.</h2>
        <div className="mt-10 space-y-3 text-lg leading-[1.35] text-slate-300 md:text-2xl">
          {revealLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
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

      <section id="image-transform" className="theme-section section-shell section-spacing" data-bg={sectionThemes[2]}>
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
      </section>

      <section id="video-showcase" className="section-shell section-spacing">
        {videoShowcase.map((item, index) => (
          <div
            key={item.title}
            className="theme-section showcase-card showcase-stage mb-10 rounded-[2rem] border border-white/15 bg-[#080d18] p-5 md:p-7"
            data-bg={sectionThemes[(index + 1) % sectionThemes.length]}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Showcase {index + 1}</p>
            <h4 className="mt-3 text-2xl font-medium text-slate-100 md:text-3xl">{item.title}</h4>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">{item.description}</p>
            {'credit' in item && item.credit ? <p className="mt-2 text-xs text-slate-400">{item.credit}</p> : null}
            <video className="mt-5 w-full rounded-[1.2rem] border border-white/10 bg-black object-cover" controls preload="metadata" playsInline src={item.src} />
          </div>
        ))}
      </section>

      <section id="contact" className="theme-section section-shell section-spacing pb-32" data-bg={sectionThemes[5]}>
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
