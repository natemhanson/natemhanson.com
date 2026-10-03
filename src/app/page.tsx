import Image from "next/image";
import type { ReactNode } from "react";
import { AmericanFlag } from "@/components/american-flag";
import { AppearanceControls } from "@/components/appearance-controls";
import { ContactForm } from "@/components/contact-form";
import {
  ArrowIcon,
  CheckIcon,
  DownIcon,
  HandArrow,
  PaperClip,
} from "@/components/icons";
import { X_PROFILE_URL } from "@/lib/x-posts";
import styles from "./page.module.css";

type Project = {
  name: string;
  href: string;
  label: string;
  description: ReactNode;
};

const NOW: Project[] = [
  {
    name: "Arbor",
    href: "https://arborhomeschool.com",
    label: "arborhomeschool.com",
    description: (
      <>
        A whole homeschool year, planned around your kid. My wife{" "}
        <a
          href="https://shelbyhanson.com"
          target="_blank"
          rel="noreferrer"
          className={styles.inlineLink}
        >
          Shelby
        </a>{" "}
        and I built it together, so more families can teach at home without
        drowning in the work that isn&rsquo;t the kids.
      </>
    ),
  },
  {
    name: "Buffer",
    href: "https://buffer.com",
    label: "buffer.com",
    description: "I help build Buffer: tools for sharing your work on social media.",
  },
  {
    name: "Faith Lab",
    href: "https://faithlabshow.com",
    label: "faithlabshow.com",
    description: "I host Faith Lab: conversations about the evidence for Christianity.",
  },
];

const WALL = ["The planning", "The lessons", "The records"];

const CHAPTERS: { title: string; text: string; href?: string }[] = [
  { title: "Radio", text: "Producer in Los Angeles and Portland." },
  {
    title: "Crazy Love",
    text: "I worked with Francis Chan and helped build Crazy Love Ministries.",
  },
  {
    title: "Church",
    text: "I was a pastor and church planter in inner-city San Francisco.",
  },
  { title: "Nonprofit", text: "Inner-city nonprofit work in San Francisco." },
  {
    title: "AppleInsider",
    text: "Staff writer and podcast host.",
    href: "https://appleinsider.com/editor/nate+hanson",
  },
  {
    title: "Sumry",
    text: "A story-based resume. We built it, grew it, and sold it.",
  },
  {
    title: "Work Different",
    text: "A job board for companies that took care of their people. We built that, then sold it too.",
  },
  {
    title: "Podcasts",
    text: "I started a show years ago and have been making podcasts ever since.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#top" className={styles.wordmark}>
          Nate Hanson
        </a>
        <nav className={styles.nav} aria-label="Sections">
          <a href="#now" className={styles.navLink}>
            Now
          </a>
          <a href="#care" className={styles.navLink}>
            What I care about
          </a>
          <a href="#along" className={styles.navLink}>
            Along the way
          </a>
          <a href="#contact" className={styles.navButton}>
            Say hi
          </a>
          <AppearanceControls />
        </nav>
      </header>

      <main>
        <section id="top" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>hi, I&rsquo;m Nate</p>
            <h1 className={styles.headline}>
              I&rsquo;m a <mark className={styles.highlight}>dad and a builder.</mark>
            </h1>
            <p className={styles.lede}>
              Right now I&rsquo;m building Arbor, helping build Buffer, and
              hosting Faith Lab.
            </p>
            <div className={styles.actions}>
              <a href="#now" className={styles.primary}>
                What I&rsquo;m up to
                <DownIcon />
              </a>
              <a href="#contact" className={styles.secondary}>
                Say hi
              </a>
            </div>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.xLink}
            >
              Find me on X: @natemhanson
            </a>
          </div>

          <div className={styles.heroArt}>
            {/* Each theme gets the photo that contrasts with its page: the
                dark-background shot on light paper, the light one on dark. */}
            <div className={styles.photo}>
              <Image
                src="/nate.jpg"
                alt="Nate Hanson"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 640px) 80vw, 340px"
                className={`${styles.portrait} ${styles.portraitLightTheme}`}
              />
              <Image
                src="/nate-light.jpg"
                alt="Nate Hanson"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 640px) 80vw, 340px"
                className={`${styles.portrait} ${styles.portraitDarkTheme}`}
              />
              <PaperClip className={styles.clip} />
            </div>
            <p className={styles.photoNote}>
              <HandArrow />
              that&rsquo;s me, hi!
            </p>
          </div>
        </section>

        <section id="now" className={styles.card} aria-labelledby="now-heading">
          <p className={styles.cardNote}>what I&rsquo;m working on</p>
          <h2 id="now-heading" className={styles.cardTitle}>
            Now
          </h2>
          <ul className={styles.nowList}>
            {NOW.map((project) => (
              <li key={project.name} className={styles.nowItem}>
                <h3 className={styles.nowName}>{project.name}</h3>
                <p className={styles.nowText}>{project.description}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.nowLink}
                >
                  {project.label}
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="care"
          className={`${styles.noted} ${styles.care}`}
          aria-labelledby="care-heading"
        >
          <h2 id="care-heading" className={styles.marginNote}>
            what I care about
          </h2>
          <div className={styles.notedBody}>
            <p className={styles.pull}>
              The best thing a family can have is{" "}
              <mark className={styles.highlight}>time together.</mark>
            </p>
            <p className={styles.prose}>
              I think the best thing a family can have is time together: a
              close home, and a childhood that isn&rsquo;t swallowed by school.
              Homeschooling gives families that time. The planning, the
              lessons, and the records are the wall.
            </p>
            <p className={styles.prose}>
              That&rsquo;s why we built Arbor. It carries those hard parts so
              parents can stay at the table with their kids. That&rsquo;s the
              work that matters most to me right now: helping families raise
              their children well, build a strong home, and actually have the
              hours to spend with each other.
            </p>
            <div className={styles.wall}>
              <ul className={styles.wallList}>
                {WALL.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.wallNote}>Arbor carries these.</p>
            </div>
          </div>
        </section>

        <section
          id="along"
          className={`${styles.noted} ${styles.along}`}
          aria-labelledby="along-heading"
        >
          <h2 id="along-heading" className={styles.marginNote}>
            along the way
          </h2>
          <ol className={styles.chapters}>
            {CHAPTERS.map((chapter, index) => (
              <li key={chapter.title} className={styles.chapter}>
                <span className={styles.chapterNumber} aria-hidden="true">
                  {index + 1}.
                </span>
                <span className={styles.chapterBody}>
                  {chapter.href ? (
                    <a
                      href={chapter.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${styles.chapterTitle} ${styles.inlineLink}`}
                    >
                      {chapter.title}
                    </a>
                  ) : (
                    <span className={styles.chapterTitle}>{chapter.title}</span>
                  )}
                  <span className={styles.chapterText}>{chapter.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="contact"
          className={`${styles.card} ${styles.contact}`}
          aria-labelledby="contact-heading"
        >
          <div className={styles.contactCopy}>
            <h2 id="contact-heading" className={styles.contactTitle}>
              Say hi.
            </h2>
            <p className={styles.prose}>
              Want to talk about Arbor, family, or anything else? Write me
              here, or find me on{" "}
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.inlineLink}
              >
                X
              </a>
              .
            </p>
          </div>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          <span>&copy; {new Date().getFullYear()} Nate Hanson</span>
          <AmericanFlag className={styles.flag} />
        </p>
        <a href="#top" className={styles.footerLink}>
          Back to top
        </a>
      </footer>
    </div>
  );
}
