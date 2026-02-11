import type { Metadata } from "next";
import { FaLinkedin, FaGitlab, FaPhone, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Sidharth V | Front-End Developer | React & Next.js",
  description:
    "Sidharth V is a Front-End Developer with 4 years of experience in React and Next.js, building scalable, high-performance web applications.",
  keywords: [
    "Sidharth V",
    "Front-End Developer Kerala",
    "React Developer India",
    "Next.js Developer",
    "React Portfolio",
    "Kannur Developer",
  ],
  authors: [{ name: "Sidharth V" }],
  creator: "Sidharth V",
  openGraph: {
    title: "Sidharth V | Front-End Developer",
    description:
      "Portfolio of Sidharth V — React & Next.js Developer with 4+ years experience.",
    // url: "https://your-domain.com",
    siteName: "Sidharth V Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidharth V | Front-End Developer",
    description: "React & Next.js Developer building scalable web apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sidharth V",
            jobTitle: "Front-End Developer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kannur",
              addressRegion: "Kerala",
              addressCountry: "India",
            },
            // url: "https://your-domain.com",
            sameAs: [
              "https://www.linkedin.com/in/sidharth-v-9a517720a/",
              "https://gitlab.com/sidhartv411",
            ],
          }),
        }}
      />
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-pink-600 text-white font-sans">
        {/* Header */}
        <header className="relative max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Sidharth V
          </h1>
          <p className="text-white/80 mt-3">
            React Developer with 4 years of experience in building user-centric
            web applications. Proficient in React.js, Next.js, and modern web
            development practices. Skilled in delivering scalable solutions and
            writing clean, efficient code. Experienced in collaborating with
            cross-functional teams to ensure project success. Committed to
            staying updated with emerging technologies and industry trends.
          </p>

          <div className="absolute top-6 right-6 flex gap-4 flex-wrap">
            {/* Phone */}
            <a
              // href="tel:7592088348"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white text-white 
    hover:bg-green-600 transition-all duration-300 
    hover:scale-105 shadow-sm hover:shadow-lg no-underline "
            >
              <FaPhone size={16} />
              7592088348
            </a>

            {/* Email */}
            <a
              // href="mailto:sidharthv411@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white text-white 
    hover:bg-red-500 transition-all duration-300 
    hover:scale-105 shadow-sm hover:shadow-lg no-underline "
            >
              <FaEnvelope size={16} />
              sidharthv411@gmail.com
            </a>

            {/* GitLab */}
            <a
              href="https://gitlab.com/sidhartv411"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white text-white 
    hover:bg-orange-500 hover:text-white transition-all duration-300 
    hover:scale-105 shadow-sm hover:shadow-lg no-underline "
            >
              <FaGitlab size={18} />
              GitLab
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sidharth-v-9a517720a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white text-white 
    hover:bg-blue-600 hover:text-white transition-all duration-300 
    hover:scale-105 shadow-sm hover:shadow-lg no-underline "
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </div>
        </header>

        {/* Skills */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[
              "React.js",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Tailwind CSS",
              "Redux",
              "Context API",
              "React Hook Form",
              "React Query",
              "Shadcn UI",
              "Ant Design",
              "Material UI",
              "Semantic UI",
              "REST APIs",
              "Git",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          <div>
            <h3 className="text-lg font-semibold">
              Front-End Developer – QDev Digital Pvt Ltd
            </h3>
            <p className="text-white/70 text-sm">
              Jan 2022 – Present | Trivandrum
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-white/90">
              <li>Built and maintained 6+ production web platforms.</li>
              <li>Implemented multi-language and multi-site support.</li>
              <li>Improved form UX using React Hook Form.</li>
              <li>Worked on authentication and reusable UI systems.</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Eleventh Dimension – E-commerce",
                link: "https://beta.eleven.sa/",
                stack: "React, Next.js, Tailwind, React Query",
                desc: "Secure auth, reusable components, responsive e-commerce frontend.",
              },
              {
                name: "Sanadak – Property Platform",
                link: "https://sanadak.sa/en",
                stack: "Next.js, Material UI, React Hook Form",
                desc: "Real estate rental & sales platform.",
              },
              {
                name: "Maska – Admin Panel",
                link: "https://maska-admin.vercel.app/",
                stack: "Next.js, Tailwind",
                desc: "Secure admin dashboard.",
              },
              {
                name: "Zeoplant – Admin Dashboard",
                link: "https://zeo.dev.neuraminds.com/",
                stack: "Next.js, TypeScript",
                desc: "Complex dynamic forms with conditional logic.",
              },
              {
                name: "Qallab - Material Selling and Buying Platform",
                link: "https://qallab.vercel.app/",
                stack: "Next.js, TypeScript",
                desc: "Reusable UI components and form handling ,e-commerce frontend.",
              },
              {
                name: "Teerup - job portal",
                link: "https://teerup.net/en",
                stack: "Next.js, JavaScript",
                desc: "Complex State management with Redux and Context API.",
              },
              // {
              //   name: "Teerup - Admin Dashboard",
              //   link: "https://teerup-v1-admin.vercel.app/",
              //   stack: "Next.js, JavaScript",
              //   desc: "Tables with pagination, sorting, and filtering using React Query.",
              // },
            ].map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition no-underline"
              >
                <h3 className="font-semibold text-lg text-white">{p.name}</h3>

                <p className="text-xs text-white/70 mt-1">{p.stack}</p>
                <p className="text-sm mt-3 text-white/90">{p.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <p className="text-white/90">
            <strong>BSc Computer Science</strong> – Mahatma Gandhi College,
            Kannur (2018–2021)
          </p>
          <p className="text-white/80">
            Higher Secondary – Computer Science, Mattanur HSS (2016–2018)
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-white/60 py-8 border-t border-white/20">
          © {new Date().getFullYear()} Sidharth V · Front-End Developer
        </footer>
      </main>
    </>
  );
}
