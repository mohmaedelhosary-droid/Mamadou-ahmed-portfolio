'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, revealLines, gradingPanels, maskingPanels, workMoments } from '@/data/content';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Intro', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Identity', href: '#identity' },
  { label: 'Craft', href: '#image-transform' },
  { label: 'Work', href: '#selected-work' },
  { label: 'Contact', href: '#contact' }
];

export default function HomePage() {
  useGsap(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out'
        }
      );

      gsap.to('.hero-media', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.about-scan', {
        width: '100%',
        stagger: 0.23,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 72%',
          end: 'bottom 48%',
          scrub: 1
        }
      });

      gsap.to('#identity', {
        backgroundColor: '#130d24',
        scrollTrigger: {
          trigger: '#identity',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true
        }
      });

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#image-transform',
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true
        }
      });

      imageTimeline
        .to('#image-after', { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
        .to('#image-accent', { opacity: 0.9, scale: 1, ease: 'none' }, 0)
        .to('body', { backgroundColor: '#0f172f', ease: 'none' }, 0);

      const videoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#video-transform',
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true
        }
      });

      videoTimeline
        .to('#video-after', { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
        .to('#video-panel', { borderColor: 'rgba(202, 233, 255, 0.45)', ease: 'none' }, 0)
        .to('body', { backgroundColor: '#050913', ease: 'none' }, 0);

      gsap.from('.story-panel', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#grading',
          start: 'top 70%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-14">
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5">
        <nav className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/15 bg-black/40 px-5 py-3 shadow-2xl backdrop-blur-xl md:px-7">
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

      <section id="hero" className="relative min-h-[115vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2200&q=80"
          alt="cinematic intro"
          fill
          priority
          className="hero-media object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(157,195,255,0.2),transparent_42%),linear-gradient(180deg,rgba(2,4,11,0.5),#020205_88%)]" />
        <div className="hero-content relative mx-auto flex min-h-[115vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-10">
          <p className="kicker">Cinematic Portfolio Experience</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.95] text-white md:text-8xl">Editing emotion, frame by frame.</h1>
          <p className="mt-8 max-w-3xl text-balance text-base leading-relaxed text-slate-200 md:text-xl">{profile.tagline}</p>
        </div>
      </section>

      <section id="about" className="section-shell section-spacing">
        <p className="kicker">About</p>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] text-white md:text-7xl">A deliberate visual storyteller focused on cinematic pacing.</h2>
        <div className="mt-10 space-y-4 text-2xl font-medium leading-[1.3] md:text-4xl">
          {revealLines.map((line) => (
            <p key={line} className="reveal-line">
              <span className="ghost-text">{line}</span>
              <span className="about-scan">
                <span className="scan-text">{line}</span>
                <span className="scan-head" />
              </span>
            </p>
          ))}
        </div>
      </section>

      <section id="identity" className="section-shell section-spacing transition-colors duration-700">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker">Identity</p>
            <h3 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">{profile.name}</h3>
            <p className="mt-3 text-lg text-slate-300 md:text-2xl">{profile.role}</p>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl">{profile.about}</p>
          </div>
          <div className="relative">
            <div className="absolute -right-8 -top-8 h-[70%] w-[70%] rounded-[4rem] bg-indigo-500/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15">
              <Image
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1300&q=80"
                alt="portrait"
                width={1100}
                height={1400}
                className="h-[640px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="image-transform" className="section-shell section-spacing">
        <div className="mb-8 max-w-3xl">
          <p className="kicker">Before / After Image</p>
          <h3 className="mt-5 text-4xl font-semibold text-white md:text-6xl">Scroll to watch the scene evolve from raw to cinematic.</h3>
        </div>
        <div className="relative h-[68vh] overflow-hidden rounded-[2.7rem] border border-white/15">
          <Image src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=2200&q=80" alt="before still" fill className="object-cover" />
          <div id="image-after" className="absolute inset-0" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2200&q=80"
              alt="after still"
              fill
              className="object-cover saturate-125"
            />
          </div>
          <div id="image-accent" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(109,40,217,0.35),transparent_45%)] opacity-0" />
        </div>
      </section>

      <section id="video-transform" className="section-shell section-spacing">
        <div className="mb-8 max-w-3xl">
          <p className="kicker">Before / After Video</p>
          <h3 className="mt-5 text-4xl font-semibold text-white md:text-6xl">Raw motion transforms into polished cinematic output while you scroll.</h3>
        </div>
        <div id="video-panel" className="relative h-[70vh] overflow-hidden rounded-[2.7rem] border border-white/20 bg-black">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline src="https://cdn.coverr.co/videos/coverr-driving-through-mountains-at-sunset-1579/1080p.mp4" />
          <div id="video-after" className="absolute inset-0" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline src="https://cdn.coverr.co/videos/coverr-timelapse-of-a-city-street-at-night-1574/1080p.mp4" />
          </div>
        </div>
      </section>

      <section id="grading" className="section-shell section-spacing">
        <p className="kicker">Color Grading Showcase</p>
        <h3 className="mt-5 max-w-4xl text-4xl font-semibold text-white md:text-6xl">Large narrative panels to present distinct visual worlds.</h3>
        <div className="mt-14 space-y-8">
          {gradingPanels.map((panel) => (
            <article key={panel.title} className="story-panel group relative overflow-hidden rounded-[2.6rem] border border-white/10 p-10 md:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
              <h4 className="relative text-3xl font-semibold text-white md:text-5xl">{panel.title}</h4>
              <p className="relative mt-4 max-w-2xl text-base text-slate-300 md:text-xl">{panel.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-spacing">
        <p className="kicker">Editing / Masking</p>
        <h3 className="mt-5 max-w-4xl text-4xl font-semibold text-white md:text-6xl">Precision layers and masked transitions built as one cinematic narrative.</h3>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {maskingPanels.map((panel) => (
            <article key={panel.title} className="story-panel rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{panel.kicker}</p>
              <h4 className="mt-5 text-2xl font-semibold text-white md:text-4xl">{panel.title}</h4>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-lg">{panel.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="selected-work" className="section-shell section-spacing">
        <p className="kicker">Selected Work</p>
        <h3 className="mt-5 max-w-4xl text-4xl font-semibold text-white md:text-6xl">Motion highlights arranged as editorial moments, not a standard grid.</h3>
        <div className="mt-12 space-y-6">
          {workMoments.map((item, index) => (
            <article
              key={item.title}
              className={`story-panel rounded-[2rem] border border-white/10 p-8 md:p-10 ${index % 2 === 0 ? 'ml-auto max-w-4xl' : 'mr-auto max-w-3xl'}`}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.kicker}</p>
              <h4 className="mt-4 text-2xl font-semibold text-white md:text-4xl">{item.title}</h4>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell section-spacing pb-32">
        <div className="rounded-[2.8rem] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 md:p-16">
          <p className="kicker">Contact</p>
          <h3 className="mt-5 text-4xl font-semibold text-white md:text-6xl">Let&apos;s build your next cinematic story.</h3>
          <div className="mt-10 space-y-4 text-lg text-slate-200">
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
