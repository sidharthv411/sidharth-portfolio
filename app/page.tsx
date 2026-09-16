"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import {
  FaLinkedin,
  FaGitlab,
  FaPhone,
  FaEnvelope,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

/* metadata must live in a separate server file when this page is a client
   component — see the note at the bottom of this file. */

/* ---------------------------------------------------------------- content */

const contacts = [
  {
    label: "sidharthv411@gmail.com",
    href: "mailto:sidharthv411@gmail.com",
    Icon: FaEnvelope,
  },
  { label: "+91 75920 88348", href: "tel:+917592088348", Icon: FaPhone },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sidharth-v-9a517720a/",
    Icon: FaLinkedin,
  },
  { label: "GitLab", href: "https://gitlab.com/sidhartv411", Icon: FaGitlab },
];

const navLinks = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

type Project = {
  name: string;
  kind: string;
  metric: string;
  desc: string;
  stack: string[];
  link?: string;
  image?: string;
  /** Path under /public/logos. Omit and the initials badge below is used instead. */
  logo?: string;
  /** Brand colour for the fallback initials badge, as a hex string. */
  accent: string;
  note?: string;
};

const projects: Project[] = [
  {
    name: "Eleventh Dimension",
    kind: "E-commerce storefront",
    link: "https://beta.eleven.sa/",
    image: "/projects/eleventh-dimension.png",
    logo: "/logos/eleventh-dimension.svg",
    accent: "#C08B2C",
    metric: "99.9% uptime on core flows",
    desc: "Storefront with separate customer and supplier portals, JWT-secured end to end.",
    stack: ["Next.js", "React Query", "Tailwind", "Semantic UI"],
  },
  {
    name: "Sanadak",
    kind: "Property rental & sales",
    link: "https://sanadak.sa/en",
    image: "/projects/sanadak.png",
    logo: "/logos/sanadak.svg",
    accent: "#3D7A68",
    metric: "40% fewer data-entry errors",
    desc: "Listing, enquiry and booking flows with heavy form validation across every device size.",
    stack: ["Next.js", "Material UI", "React Hook Form", "React Query"],
  },
  {
    name: "Qallab",
    kind: "Materials marketplace",
    link: "https://qallab.vercel.app/",
    image: "/projects/qallab.png",
    logo: "/logos/qallab.svg",
    accent: "#B25B45",
    metric: "500+ supplier & contractor accounts",
    desc: "Role-based buying and selling platform with multi-site support from one codebase.",
    stack: ["Next.js", "TypeScript", "Context API", "shadcn/ui"],
  },
  {
    name: "Zeoplant",
    kind: "Admin dashboard",
    image: "/projects/zeoplant.png",
    logo: "/logos/zeoplant.svg",
    accent: "#4B8F5E",
    note: "Internal tool — walkthrough on request",
    metric: "12+ staff hours saved weekly",
    desc: "Dynamic forms with conditional logic, replacing a manual spreadsheet workflow.",
    stack: ["Next.js", "TypeScript", "Redux", "Jest"],
  },
  {
    name: "TeerUP",
    kind: "Career networking",
    link: "https://teerup.net/en",
    image: "/projects/teerup.png",
    logo: "/logos/teerup.svg",
    accent: "#3E6FB0",
    metric: "2,000+ active users",
    desc: "Job posting and application workflows, with state split across Redux and Context.",
    stack: ["Next.js", "Redux", "Material UI", "Formik"],
  },
  {
    name: "Maska",
    kind: "Admin console",
    image: "/projects/maska.png",
    logo: "/logos/maska.svg",
    accent: "#8A5FB0",
    note: "Internal tool — walkthrough on request",
    metric: "35% less duplicated page code",
    desc: "Internal console standardised on a single shared component library.",
    stack: ["Next.js", "Tailwind", "React Query"],
  },
];

/** First letter(s) for the fallback badge, e.g. "Eleventh Dimension" -> "ED". */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const toolkit = [
  { group: "Languages", items: "JavaScript (ES6+), TypeScript, HTML5, CSS3" },
  { group: "Frameworks", items: "React.js, Next.js" },
  { group: "State", items: "Redux, Context API, React Query" },
  {
    group: "Forms & data",
    items: "React Hook Form, Yup, Formik, Axios, REST APIs",
  },
  {
    group: "Styling",
    items: "Tailwind CSS, Material UI, shadcn/ui, Ant Design, Semantic UI",
  },

  {
    group: "Tools",
    items:
      "Git, GitHub, GitLab, Postman, VS Code, Claude, GitHub Copilot, Cursor, Google Antigravity, Jest, Figma",
  },
  {
    group: "Concepts",
    items:
      "RESTful APIs, JWT Authentication, Responsive Design, Performance Optimization, Lazy Loading, Code Splitting, Reusable Components, Component Architecture, Agile, Scrum, i18n, SEO Optimization",
  },
];

const experience = [
  "Engineered scalable, responsive web applications for e-commerce, property rental, and admin dashboard platforms using React.js, Next.js, JavaScript, and TypeScript.",
  "Built reusable UI components using React.js, HTML5, CSS3, Tailwind CSS, and Material UI, improving maintainability.",
  "Integrated JWT Authentication and RESTful APIs using Axios for secure and efficient data communication.",
  "Created dynamic forms using React Hook Form and Yup validation to improve data accuracy and user experience.",
  "Enabled multi-language (i18n) and multi-site support to enhance accessibility and scalability.",
  "Managed application state and server-side data using Redux, Context API, and React Query.",
  "Optimized application performance through Lazy Loading, Code Splitting, and reusable component architecture.",
  "Delivered production-ready features by collaborating with cross-functional teams in Agile/Scrum environments using Git, GitLab, Postman, and VS Code.",
];

/* -------------------------------------------------------- motion presets */

function useMotionVariants() {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };

  return { fadeUp, stagger };
}

/* ------------------------------------------------------------------ aurora */
/* Three soft blobs drifting on independent loops behind the hero, plus a
   faint grid — the layered-glow look common to AI product pages. Pure CSS
   animation, no JS per-frame cost. */

function Aurora() {
  const reduce = useReducedMotion();

  const blobs = [
    { color: "#1F5148", size: "38rem", top: "-14rem", left: "8%", dur: 22 },
    { color: "#4B6B3C", size: "30rem", top: "-6rem", left: "62%", dur: 27 },
    { color: "#2C4741", size: "26rem", top: "6rem", left: "38%", dur: 19 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* faint grid, fades toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#EAF0EC 1px, transparent 1px), linear-gradient(90deg, #EAF0EC 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {blobs.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            reduce
              ? { opacity: 0.55, scale: 1 }
              : {
                  opacity: 0.55,
                  scale: 1,
                  x: [0, 28, -18, 0],
                  y: [0, -20, 16, 0],
                }
          }
          transition={
            reduce
              ? { duration: 1 }
              : { duration: b.dur, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(closest-side, ${b.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- nav */
/* Fixed top bar. Transparent over the hero, gains a solid background and a
   bottom border once the page scrolls. Collapses to a slide-down sheet on
   mobile. */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#2C4741] bg-[#101F1D]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* <a
          href="#top"
          className="font-serif text-lg tracking-tight text-[#EAF0EC] no-underline"
        >
          Sidharth<span className="text-[#E8B33C]"></span>
        </a> */}

        <ul className="hidden items-center gap-8 md:flex list-none">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-sm text-[#8FB8A8] no-underline transition-colors hover:text-[#E8B33C]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:sidharthv411@gmail.com"
          className="hidden rounded-full border border-[#2C4741] px-4 py-2 text-sm text-[#EAF0EC] no-underline transition-colors hover:border-[#E8B33C] hover:text-[#E8B33C] md:inline-block"
        >
          Say hello
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-[#2C4741] p-2 text-[#EAF0EC] md:hidden"
        >
          {open ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-[#2C4741] bg-[#101F1D] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2 list-none">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-base text-[#EAF0EC] no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:sidharthv411@gmail.com"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-[#E8B33C] px-4 py-2.5 text-center text-sm text-[#101F1D] no-underline"
                >
                  Say hello
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------- tech marquee */
/* Infinite horizontal scroll of the core stack, faded at both edges. Two
   copies of the list sit side by side and the wrapper translates by exactly
   -50%, so the loop is seamless. Pauses on hover/focus, and stays still
   entirely under reduced motion. */

const marqueeItems = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Redux",
  "Tailwind CSS",
  "React Query",
  "React Hook Form",
  "REST APIs",
  "JWT Auth",
  "shadcn/ui",
];

function TechMarquee() {
  const reduce = useReducedMotion();
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="relative mt-16 border-t border-[#2C4741] py-6"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-10 hover:[animation-play-state:paused]"
        style={
          reduce ? undefined : { animation: "marquee 26s linear infinite" }
        }
      >
        {items.map((item, i) => (
          <span key={i} className="whitespace-nowrap text-sm text-[#8FB8A8]/70">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- logo badge */

function LogoBadge({
  name,
  logo,
  accent,
}: {
  name: string;
  logo?: string;
  accent: string;
}) {
  const [broken, setBroken] = useState(!logo);

  if (broken) {
    return (
      <div
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-[#101F1D]"
        style={{ backgroundColor: accent }}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#101F1D] p-2 ring-1 ring-[#2C4741]">
      <Image
        src={logo as string}
        alt=""
        width={28}
        height={28}
        className="h-full w-full object-contain"
        onError={() => setBroken(true)}
      />
    </div>
  );
}

/* --------------------------------------------------------- project card */

function ProjectCard({ project }: { project: Project }) {
  const { fadeUp } = useMotionVariants();
  const { name, kind, metric, desc, stack, link, logo, accent, note } = project;
  const cardRef = useRef<HTMLElement>(null);

  const shell =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C4741] bg-[#16302B] no-underline transition-colors duration-200";
  const interactive =
    " hover:border-[#E8B33C]/60 hover:bg-[#1A3830] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8B33C]";

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  function setCardRef(element: HTMLElement | null) {
    cardRef.current = element;
  }

  const glow = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(232,179,60,0.12), transparent 70%)",
      }}
    />
  );

  const inner = (
    <div className="flex flex-1 flex-col p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <LogoBadge name={name} logo={logo} accent={accent} />
          <div>
            <h3 className="font-serif text-2xl leading-tight text-[#EAF0EC]">
              {name}
            </h3>
            <p className="mt-1 text-sm text-[#8FB8A8]">{kind}</p>
          </div>
        </div>
        {link ? (
          <FaExternalLinkAlt
            size={13}
            aria-hidden="true"
            className="mt-1.5 shrink-0 text-[#2C4741] transition-colors group-hover:text-[#E8B33C]"
          />
        ) : null}
      </div>

      <p className="mt-5 text-[0.95rem] leading-relaxed text-[#EAF0EC]/85">
        {desc}
      </p>

      <p className="mt-5 text-sm text-[#E8B33C]">{metric}</p>

      {!link && note ? (
        <p className="mt-2 text-xs text-[#8FB8A8]">{note}</p>
      ) : null}

      <ul className="mt-auto flex flex-wrap gap-2 border-t border-[#2C4741] pt-5 [margin-top:1.5rem] list-none">
        {stack.map((s) => (
          <li
            key={s}
            className="rounded-full bg-[#101F1D] px-3 py-1 text-xs text-[#8FB8A8]"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="h-full">
      {link ? (
        <a
          ref={setCardRef}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMove}
          className={shell + interactive}
        >
          {glow}
          {inner}
        </a>
      ) : (
        <article ref={setCardRef} onMouseMove={handleMove} className={shell}>
          {glow}
          {inner}
        </article>
      )}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-[#2C4741]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <a
              href="#top"
              className="font-serif text-xl text-[#EAF0EC] no-underline"
            >
              Sidharth<span className="text-[#E8B33C]">.</span>
            </a>
            <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-[#8FB8A8]">
              Front-End Developer
            </p>
          </div>

          <nav aria-label="Sections">
            <p className="text-sm text-[#E8B33C]">Sections</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-sm text-[#8FB8A8] no-underline transition-colors hover:text-[#EAF0EC]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm text-[#E8B33C]">Contact</p>
            <ul className="mt-4 space-y-2.5 list-none">
              {contacts.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2.5 text-sm text-[#8FB8A8] no-underline transition-colors hover:text-[#EAF0EC]"
                  >
                    <Icon size={13} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-[#2C4741] pt-6 sm:flex-row">
          <p className="text-xs text-[#8FB8A8]">
            {/* © {new Date().getFullYear()} Sidharth V. All rights reserved. */}
          </p>
          <p className="text-xs text-[#8FB8A8]">
            © {new Date().getFullYear()} Sidharth V. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------- page */

export default function Home() {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sidharth V",
            jobTitle: "Frontend Developer building for logged-in users",
            email: "sidharthv411@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kannur",
              addressRegion: "Kerala",
              addressCountry: "India",
            },
            sameAs: [
              "https://www.linkedin.com/in/sidharth-v-9a517720a/",
              "https://gitlab.com/sidhartv411",
            ],
          }),
        }}
      />

      <style jsx global>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div id="top" />
      <Navbar />

      <main className="min-h-screen bg-[#101F1D] text-[#EAF0EC] antialiased selection:bg-[#E8B33C] selection:text-[#101F1D]">
        {/* ---------------------------------------------------------- hero */}
        <header className="relative overflow-hidden">
          <Aurora />

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 sm:pt-40"
          >
            <motion.p variants={fadeUp} className="text-sm text-[#8FB8A8]">
              Available for new roles
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 bg-[linear-gradient(100deg,#EAF0EC_0%,#E8B33C_35%,#8FB8A8_60%,#EAF0EC_100%)] bg-[length:250%_100%] bg-clip-text font-serif text-[clamp(3rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-transparent [animation:gradient-shift_9s_ease_infinite]"
            >
              Sidharth V
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-[46ch] font-serif text-[clamp(1.35rem,3vw,2rem)] leading-snug text-[#EAF0EC]"
            >
              Frontend Developer | React.js | Next.js
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[62ch] leading-relaxed text-[#8FB8A8]"
            >
              I build the parts of the internet people log into and stay in —
              e-commerce backends, property platforms, admin dashboards real
              teams rely on daily.{" "}
              <span className="text-[#E8B33C]">12+ hours</span> of manual work
              cut every week. <span className="text-[#E8B33C]">500+</span>{" "}
              supplier accounts secured with JWT auth. A UI scaled to{" "}
              <span className="text-[#E8B33C]">2,000+</span> active users
              without slowing down. I care less about how a page looks on day
              one, more about whether it holds up on day two hundred.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-3 list-none"
            >
              {contacts.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2.5 rounded-full border border-[#2C4741] px-4 py-2 text-sm text-[#EAF0EC] no-underline transition-all duration-200 hover:border-[#E8B33C] hover:text-[#E8B33C] hover:shadow-[0_0_0_1px_rgba(232,179,60,0.25),0_0_18px_rgba(232,179,60,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8B33C]"
                  >
                    <Icon size={14} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <TechMarquee />
        </header>

        {/* ------------------------------------------------------ projects */}
        <section
          id="work"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-baseline justify-between gap-3 border-t border-[#2C4741] pt-8"
          >
            <h2 className="font-serif text-3xl sm:text-4xl">Selected work</h2>
            {/* <p className="text-sm text-[#8FB8A8]">Six production platforms</p> */}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-10 grid gap-5 md:grid-cols-2"
          >
            {projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </motion.div>
        </section>

        {/* ---------------------------------------------------- experience */}
        <section
          id="experience"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="border-t border-[#2C4741] pt-8 font-serif text-3xl sm:text-4xl"
          >
            Experience
          </motion.h2>

          <div className="mt-10 grid gap-8 md:grid-cols-[16rem_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg text-[#EAF0EC]">Front-End Developer</h3>
              <p className="mt-1 text-[#E8B33C]">QDev Digital Pvt Ltd</p>
              <p className="mt-2 text-sm text-[#8FB8A8]">
                Jan 2022 — Present
                <br />
                Thiruvananthapuram, Kerala
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="space-y-4"
            >
              {experience.map((point) => (
                <motion.li
                  key={point}
                  variants={fadeUp}
                  className="flex max-w-[60ch] gap-4 text-[0.95rem] leading-relaxed text-[#8FB8A8]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-4 shrink-0 bg-[#2C4741]"
                  />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* ------------------------------------------------------- toolkit */}
        <section
          id="toolkit"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="border-t border-[#2C4741] pt-8 font-serif text-3xl sm:text-4xl"
          >
            Toolkit
          </motion.h2>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-10"
          >
            {toolkit.map((t) => (
              <motion.div
                key={t.group}
                variants={fadeUp}
                className="grid gap-1 border-b border-[#2C4741] py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <dt className="text-sm text-[#E8B33C]">{t.group}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-[#8FB8A8]">
                  {t.items}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </section>

        {/* ----------------------------------------------------- education */}
        <section
          id="education"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="border-t border-[#2C4741] pt-8 font-serif text-3xl sm:text-4xl"
          >
            Education
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mt-10 space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <div>
                <h3 className="text-lg text-[#EAF0EC]">BSc Computer Science</h3>
                <p className="mt-1 text-sm text-[#8FB8A8]">
                  Mahatma Gandhi College, Iritty — Kannur University
                </p>
              </div>
              <p className="text-sm tabular-nums text-[#8FB8A8]">2018 — 2021</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <div>
                <h3 className="text-lg text-[#EAF0EC]">Higher Secondary</h3>
                <p className="mt-1 text-sm text-[#8FB8A8]">
                  Computer Science — Mattanur HSS
                </p>
              </div>
              <p className="text-sm tabular-nums text-[#8FB8A8]">2016 — 2018</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ------------------------------------------------------- contact */}
        <section
          id="contact"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-[#2C4741] bg-[#16302B] px-8 py-14 text-center sm:px-14"
          >
            <h2 className="mx-auto max-w-[18ch] font-serif text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight">
              Looking for someone to build your front end?
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] leading-relaxed text-[#8FB8A8]">
              Open to frontend roles and freelance work. Email is fastest — I
              reply within a day.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:sidharthv411@gmail.com"
                className="rounded-full bg-[#E8B33C] px-7 py-3 text-[#101F1D] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8B33C]"
              >
                Send me an email
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.linkedin.com/in/sidharth-v-9a517720a/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#2C4741] px-7 py-3 text-[#EAF0EC] no-underline transition-colors hover:border-[#E8B33C] hover:text-[#E8B33C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8B33C]"
              >
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
