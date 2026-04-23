'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gradingLooks, highlights, profile, services, techniques } from '@/data/content';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <header className="mb-10">
      <p className="kicker">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-mist md:text-5xl">{title}</h2>
      {text && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">{text}</p>}
    </header>
  );
}

export default function HomePage() {
  useGsap(() => {
    const aboutHeading = document.querySelector('#about-heading');
    const aboutBody = document.querySelector('#about-copy');

    if (aboutHeading && aboutBody) {
      gsap.fromTo(
        [aboutHeading, aboutBody],
        { filter: 'blur(10px)', opacity: 0.3, y: 40 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: '#about',
            start: 'top 72%',
            end: 'top 30%',
            scrub: 0.8
          }
        }
      );
    }

    gsap.to('#image-after', {
      clipPath: 'inset(0 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#image-compare',
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1.1
      }
    });

    gsap.to('body', {
      backgroundColor: '#071327',
      scrollTrigger: {
        trigger: '#image-compare',
        start: 'top 55%',
        end: 'bottom 35%',
        scrub: 1
      }
    });

    gsap.to('#video-after', {
      clipPath: 'inset(0 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#video-compare',
        start: 'top 75%',
        end: 'bottom 38%',
        scrub: 1.2
      }
    });
  }, []);

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="/assets/videos/hero-city.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-night/80 to-ink" />
        <div className="section-shell relative flex min-h-screen flex-col justify-end pb-24">
          <p className="kicker">Cinematic Portfolio</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-7xl">{profile.name}</h1>
          <p className="mt-3 text-lg text-haze md:text-2xl">{profile.role}</p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-lg">{profile.tagline}</p>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className="kicker">About Me</p>
            <h2 id="about-heading" className="mt-3 text-3xl font-semibold text-mist md:text-5xl">
              I craft emotion through pacing, color and sound.
            </h2>
            <p id="about-copy" className="mt-5 text-sm leading-relaxed text-slate-300 md:text-base">
              {profile.about}
            </p>
          </div>
          <div className="glass-panel relative overflow-hidden p-2">
            <Image
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80"
              alt="Mohamed Ahmed at work"
              width={1200}
              height={1200}
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle kicker="Services" title="Post-production built for narrative impact" />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service} className="glass-panel p-6 text-lg text-slate-100">
              {service}
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle
          kicker="Featured Project"
          title="An emotional short film transformation"
          text="Pre-shot footage was reshaped into a strong emotional arc through intentional grading, layered sound design, and precision-driven edit rhythm."
        />
        <div className="glass-panel overflow-hidden">
          <video className="h-[460px] w-full object-cover" autoPlay muted loop playsInline src="/assets/videos/featured-bedroom.mp4" />
        </div>
      </section>

      <section id="image-compare" className="section-shell">
        <SectionTitle
          kicker="Before / After Image"
          title="Scroll through the color grading shift"
          text="As you scroll, the raw still transforms into the graded cinematic frame while the environment tone deepens."
        />
        <div className="glass-panel relative h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1800&q=80"
            alt="Before color grading"
            fill
            className="object-cover"
          />
          <div id="image-after" className="absolute inset-0" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=80"
              alt="After color grading"
              fill
              className="object-cover saturate-125"
            />
          </div>
        </div>
      </section>

      <section id="video-compare" className="section-shell">
        <SectionTitle
          kicker="Before / After Video"
          title="Raw footage evolves into a cinematic scene"
          text="A synchronized scroll reveal compares untreated footage and final graded output, showcasing tonal separation and mood." 
        />
        <div className="glass-panel relative h-[65vh] overflow-hidden">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline src="/assets/videos/gas-before.mp4" />
          <div id="video-after" className="absolute inset-0" style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline src="/assets/videos/gas-after.mp4" />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle kicker="Color Grading Showcase" title="Designed looks for varied visual moods" />
        <div className="grid gap-4 md:grid-cols-3">
          {gradingLooks.map((look) => (
            <article key={look.title} className="glass-panel p-6">
              <h3 className="text-xl text-mist">{look.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{look.mood}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle kicker="Editing Techniques" title="Technical precision behind each story beat" />
        <div className="space-y-4">
          {techniques.map((item) => (
            <article key={item.title} className="glass-panel p-6">
              <h3 className="text-xl text-mist">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionTitle kicker="Selected Work" title="Motion highlights and scene fragments" />
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((title) => (
            <div key={title} className="glass-panel p-6 text-center text-slate-200">
              {title}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-32">
        <SectionTitle kicker="Contact" title="Open for freelance projects" text="Let’s build emotional visuals with cinematic depth." />
        <div className="glass-panel max-w-xl space-y-4 p-8">
          <p className="flex items-center gap-3 text-slate-200">
            <Mail className="h-4 w-4 text-haze" /> mohmaedelhosary@gmail.com
          </p>
          <p className="flex items-center gap-3 text-slate-200">
            <Phone className="h-4 w-4 text-haze" /> +9010987922
          </p>
        </div>
      </section>
    </main>
  );
}
