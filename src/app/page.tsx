import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
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
            them&nbsp;&mdash; a closer family, and a childhood that isn&rsquo;t
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
                built it so more families can teach at home&nbsp;&mdash; without
                drowning in the work that isn&rsquo;t the kids.
              </p>
            </div>
            <span className={styles.arborButton}>
              See Arbor
              <ArrowIcon />
            </span>
          </a>
          <p className={styles.also}>
            I also co-host{" "}
            <a
              href="https://faithlabshow.com"
              target="_blank"
              rel="noreferrer"
            >
              Faith Lab
            </a>{" "}
            with Shelby&nbsp;&mdash; conversations about the evidence for
            Christianity.
          </p>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}>Get in touch</p>
            <p>
              Want to talk about Arbor, family, or anything else? Write me here.
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
        <p>&copy; {new Date().getFullYear()} Nate Hanson</p>
      </footer>
    </>
  );
}
