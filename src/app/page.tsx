import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { XFeed, XFeedSkeleton } from "@/components/x-feed";
import { X_PROFILE_URL } from "@/lib/x-posts";
import styles from "./page.module.css";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function Squiggle() {
  return (
    <svg
      className={styles.squiggle}
      viewBox="0 0 230 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10 C 24 2, 44 14, 64 8 S 104 2, 124 9 S 164 14, 184 6 S 216 4, 226 9"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunBadge() {
  return (
    <svg
      className={styles.sunBadge}
      viewBox="0 0 88 88"
      aria-hidden="true"
    >
      <circle cx="44" cy="44" r="20" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="44" y1="6" x2="44" y2="16" />
        <line x1="44" y1="72" x2="44" y2="82" />
        <line x1="6" y1="44" x2="16" y2="44" />
        <line x1="72" y1="44" x2="82" y2="44" />
        <line x1="17" y1="17" x2="24" y2="24" />
        <line x1="64" y1="64" x2="71" y2="71" />
        <line x1="71" y1="17" x2="64" y2="24" />
        <line x1="24" y1="64" x2="17" y2="71" />
      </g>
    </svg>
  );
}

function TickerStar() {
  return (
    <svg
      className={styles.tickerStar}
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path
        d="M7 0 L8.8 5.2 L14 7 L8.8 8.8 L7 14 L5.2 8.8 L0 7 L5.2 5.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TreeIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 96 L60 58"
        stroke="var(--green)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="60" cy="44" r="26" fill="var(--green)" />
      <circle cx="38" cy="58" r="17" fill="var(--green)" opacity="0.75" />
      <circle cx="82" cy="58" r="17" fill="var(--green)" opacity="0.75" />
      <path
        d="M36 100 L84 100"
        stroke="var(--butter-border)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AmericanFlag() {
  const cantonWidth = 7.6;
  const cantonHeight = (7 * 10) / 13;
  const stars: { cx: number; cy: number }[] = [];

  for (let row = 0; row < 9; row++) {
    const cols = row % 2 === 0 ? 6 : 5;
    const x0 = ((row % 2 === 0 ? 1 : 2) * cantonWidth) / 12;
    const y = ((row + 1) * cantonHeight) / 10;
    for (let col = 0; col < cols; col++) {
      stars.push({ cx: x0 + (col * cantonWidth) / 6, cy: y });
    }
  }

  return (
    <svg
      className={styles.flag}
      viewBox="0 0 19 10"
      width="18"
      height="10"
      role="img"
      aria-label="United States flag"
    >
      <rect width="19" height="10" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((stripe) => (
        <rect
          key={stripe}
          y={(stripe * 10) / 13}
          width="19"
          height={10 / 13}
          fill="#fff"
        />
      ))}
      <rect width={cantonWidth} height={cantonHeight} fill="#3c3b6e" />
      {stars.map((star) => (
        <circle
          key={`${star.cx}-${star.cy}`}
          cx={star.cx}
          cy={star.cy}
          r="0.18"
          fill="#fff"
        />
      ))}
    </svg>
  );
}

const TICKER_ITEMS = [
  "Co-founder of Arbor",
  "Helps families homeschool",
  "Helps build Buffer",
  "Hosts Faith Lab",
];

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.topbar}>
          <p className={styles.wordmark}>Nate Hanson</p>
          <nav className={styles.nav} aria-label="Sections">
            <a href="#now" className={styles.navLink}>
              Now
            </a>
            <a href="#story" className={styles.navLink}>
              Story
            </a>
            <a href="#along-the-way" className={styles.navLink}>
              Along the way
            </a>
            <a href="#contact" className={styles.navCta}>
              Say hi
            </a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.chipRow}>
              <span className={styles.chip}>Dad</span>
              <span className={`${styles.chip} ${styles.chipGreen}`}>
                Builder
              </span>
            </div>
            <div className={styles.heroTitleWrap}>
              <h1 className={styles.heroTitle}>Hi, I&rsquo;m Nate.</h1>
              <Squiggle />
            </div>
            <p className={styles.heroLede}>
              I&rsquo;m a dad and a builder. I started{" "}
              <a
                href="https://arborhomeschool.com"
                target="_blank"
                rel="noreferrer"
              >
                Arbor
              </a>{" "}
              to take the hard parts of homeschooling off parents&rsquo;
              plates, so more families can raise their kids together.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://arborhomeschool.com"
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
              >
                See Arbor
                <ArrowIcon />
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Say hi
              </a>
            </div>
          </div>
          <div className={styles.heroArt}>
            <div className={styles.polaroid}>
              <Image
                src="/nate.jpg"
                alt="Nate Hanson"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 640px) 78vw, 330px"
                className={styles.portrait}
              />
              <p className={styles.polaroidCaption}>hi, that&rsquo;s me</p>
            </div>
            <SunBadge />
          </div>
        </section>

        <div className={styles.ticker} aria-hidden="true">
          {TICKER_ITEMS.map((item, index) => (
            <span key={item} className={styles.tickerItem}>
              {index > 0 ? <TickerStar /> : null}
              {item}
            </span>
          ))}
        </div>

        <section id="now" className={styles.section}>
          <h2 className={styles.sectionHeading}>What I&rsquo;m up to</h2>
          <div className={styles.arborCard}>
            <div className={styles.arborCopy}>
              <span className={styles.arborBadge}>The big one</span>
              <h3 className={styles.arborTitle}>Arbor</h3>
              <p className={styles.arborText}>
                A whole homeschool year, planned around your kid. My wife{" "}
                <a
                  href="https://shelbyhanson.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Shelby
                </a>{" "}
                and I built it together, so more families can teach at home
                without drowning in the work that isn&rsquo;t the kids.
              </p>
              <a
                href="https://arborhomeschool.com"
                target="_blank"
                rel="noreferrer"
                className={styles.arborLink}
              >
                See Arbor
                <ArrowIcon />
              </a>
            </div>
            <div className={styles.arborArt}>
              <div className={styles.artTile}>
                <TreeIllustration />
              </div>
            </div>
          </div>
          <div className={styles.smallCards}>
            <a
              href="https://buffer.com"
              target="_blank"
              rel="noreferrer"
              className={styles.smallCard}
            >
              <h3 className={styles.smallCardTitle}>Buffer</h3>
              <p className={styles.smallCardText}>
                I also help build Buffer: tools for sharing your work on
                social media.
              </p>
            </a>
            <a
              href="https://faithlabshow.com"
              target="_blank"
              rel="noreferrer"
              className={styles.smallCard}
            >
              <h3 className={styles.smallCardTitle}>Faith Lab</h3>
              <p className={styles.smallCardText}>
                Conversations about the evidence for Christianity.
              </p>
            </a>
            <a
              href="https://faithpods.com"
              target="_blank"
              rel="noreferrer"
              className={styles.smallCard}
            >
              <h3 className={styles.smallCardTitle}>FaithPods</h3>
              <p className={styles.smallCardText}>
                An agency that grows Christian voices by landing them
                interviews on podcasts and in publications.
              </p>
            </a>
          </div>
        </section>

        <section id="story" className={styles.section}>
          <div className={styles.storyCard}>
            <div className={`${styles.tape} ${styles.tapeLeft}`} />
            <div className={`${styles.tape} ${styles.tapeRight}`} />
            <h2 className={styles.sectionHeading}>The short story</h2>
            <p className={styles.storyText}>
              I think the best thing a family can have is time together: a
              close home, and a childhood that isn&rsquo;t swallowed by
              school. Homeschooling gives families that time. The planning,
              the lessons, and the records are the wall.
            </p>
            <p className={styles.storyText}>
              That&rsquo;s why we built Arbor. It carries those hard parts so
              parents can stay at the table with their kids. That&rsquo;s the
              work that matters most to me right now: helping families raise
              their children well, build a strong home, and actually have the
              hours to spend with each other.
            </p>
            <p className={styles.signature}>&mdash; Nate</p>
          </div>
        </section>

        <section id="along-the-way" className={styles.section}>
          <div className={styles.alongHead}>
            <h2 className={styles.sectionHeading}>Along the way</h2>
            <p className={styles.alongLede}>
              Before Arbor, a few other chapters.
            </p>
          </div>
          <ul className={styles.alongGrid}>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Radio</p>
              <p className={styles.alongText}>
                Producer in Los Angeles and Portland.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Crazy Love</p>
              <p className={styles.alongText}>
                I worked with Francis Chan and helped build Crazy Love
                Ministries.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Church</p>
              <p className={styles.alongText}>
                I was a pastor and church planter in inner-city San
                Francisco.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Nonprofit</p>
              <p className={styles.alongText}>
                Inner-city nonprofit work in San Francisco.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>
                <a
                  href="https://appleinsider.com/editor/nate+hanson"
                  target="_blank"
                  rel="noreferrer"
                >
                  AppleInsider
                </a>
              </p>
              <p className={styles.alongText}>
                Staff writer and podcast host.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Sumry</p>
              <p className={styles.alongText}>
                A story-based resume. We built it, grew it, and sold it.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Work Different</p>
              <p className={styles.alongText}>
                A job board for companies that took care of their people. We
                built that, then sold it too.
              </p>
            </li>
            <li className={styles.alongCard}>
              <p className={styles.alongTitle}>Podcasts</p>
              <p className={styles.alongText}>
                I started a show years ago and have been making podcasts
                ever since.
              </p>
            </li>
          </ul>
        </section>

        <Suspense fallback={<XFeedSkeleton />}>
          <XFeed />
        </Suspense>

        <section id="contact" className={styles.section}>
          <div className={styles.contactPanel}>
            <div className={styles.contactCopy}>
              <h2 className={styles.contactHeading}>Say hi.</h2>
              <p>
                Want to talk about Arbor, family, or anything else? Write me
                here, or find me on{" "}
                <a href={X_PROFILE_URL} target="_blank" rel="noreferrer">
                  X
                </a>
                .
              </p>
              <p>
                Questions about the show go to{" "}
                <a
                  href="https://faithlabshow.com/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  faithlabshow.com/contact
                </a>
                .
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          <span>&copy; {new Date().getFullYear()} Nate Hanson</span>
          <AmericanFlag />
        </p>
      </footer>
    </>
  );
}
