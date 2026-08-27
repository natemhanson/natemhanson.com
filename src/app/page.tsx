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

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.masthead}>
          <div className={styles.portraitWrap}>
            <Image
              src="/nate.jpg"
              alt="Nate Hanson"
              width={1254}
              height={1254}
              priority
              sizes="96px"
              className={styles.portrait}
            />
          </div>
          <div className={styles.mastheadCopy}>
            <h1 className={styles.name}>Nate Hanson</h1>
            <p className={styles.tag}>
              Dad. Builder. Co-founder of{" "}
              <a
                href="https://arborhomeschool.com"
                target="_blank"
                rel="noreferrer"
              >
                Arbor
              </a>
              .
            </p>
          </div>
        </header>

        <p className={styles.lede}>
          I&rsquo;m a dad and a builder. I started{" "}
          <a
            href="https://arborhomeschool.com"
            target="_blank"
            rel="noreferrer"
          >
            Arbor
          </a>{" "}
          to take the hard parts of homeschooling off parents&rsquo; plates, so
          more families can raise their kids together.
        </p>

        <section id="about" className={styles.letter}>
          <p>
            My wife{" "}
            <a href="https://shelbyhanson.com" target="_blank" rel="noreferrer">
              Shelby
            </a>{" "}
            and I are raising three kids at home. We wanted more time with
            them: a closer family, and a childhood that isn&rsquo;t
            swallowed by school. Homeschooling was the way. The planning, the
            lessons, and the records were the wall.
          </p>
          <p>
            So we built Arbor together. It carries those hard parts so parents
            can stay at the table with their kids. That&rsquo;s the work that
            matters most to me right now: helping more people raise their
            children well, build a strong family, and actually have the hours
            to spend with them.
          </p>
        </section>

        <section id="work" className={styles.section}>
          <p className={styles.sectionLabel}>What I&rsquo;m building</p>
          <a
            href="https://arborhomeschool.com"
            target="_blank"
            rel="noreferrer"
            className={styles.arborCard}
          >
            <div className={styles.arborCopy}>
              <h2>Arbor</h2>
              <p>
                A whole homeschool year, planned around your kid. Shelby and I
                built it so more families can teach at home without
                drowning in the work that isn&rsquo;t the kids.
              </p>
            </div>
            <span className={styles.arborButton}>
              See Arbor
              <ArrowIcon />
            </span>
          </a>
          <p className={styles.also}>
            I also help build Buffer. And I host{" "}
            <a
              href="https://faithlabshow.com"
              target="_blank"
              rel="noreferrer"
            >
              Faith Lab
            </a>
            : conversations about the evidence for Christianity.
          </p>
        </section>

        <section id="along-the-way" className={styles.section}>
          <p className={styles.sectionLabel}>Along the way</p>
          <p className={styles.pastLede}>
            Before Arbor, a few other chapters.
          </p>
          <ul className={styles.pastList}>
            <li>
              <p className={styles.pastTitle}>Radio</p>
              <p>Producer in Los Angeles and Portland.</p>
            </li>
            <li>
              <p className={styles.pastTitle}>Crazy Love</p>
              <p>
                I worked with Francis Chan, helped build Crazy Love Ministries,
                and planted churches with him.
              </p>
            </li>
            <li>
              <p className={styles.pastTitle}>
                <a
                  href="https://appleinsider.com/editor/nate+hanson"
                  target="_blank"
                  rel="noreferrer"
                >
                  AppleInsider
                </a>
              </p>
              <p>Staff writer and podcast host.</p>
            </li>
            <li>
              <p className={styles.pastTitle}>Sumry</p>
              <p>
                A story-based resume. We built it, grew it, and sold it.
              </p>
            </li>
            <li>
              <p className={styles.pastTitle}>Work Different</p>
              <p>
                A job board for companies that took care of their people. We
                built that, then sold it too.
              </p>
            </li>
            <li>
              <p className={styles.pastTitle}>Podcasts</p>
              <p>
                I started a show and a podcasting network. That work continues
                in{" "}
                <a
                  href="https://faithlabshow.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Faith Lab
                </a>{" "}
                and{" "}
                <a
                  href="https://faithpods.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  FaithPods
                </a>
                .
              </p>
            </li>
          </ul>
        </section>

        <Suspense fallback={<XFeedSkeleton />}>
          <XFeed />
        </Suspense>

        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}>Get in touch</p>
            <p>
              Want to talk about Arbor, family, or anything else? Write me here,
              or find me on{" "}
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
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          <AmericanFlag />
          <span>&copy; {new Date().getFullYear()} Nate Hanson</span>
        </p>
      </footer>
    </>
  );
}
