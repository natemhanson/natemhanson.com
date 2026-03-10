import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import styles from "./page.module.css";

const lede = (
  <>
    I was a church planter and worship leader who lost his faith. I started a
    podcast to talk about it, and more than 2 million downloads later, it was
    clear I wasn&rsquo;t the only one asking those questions. But then
    something surprising happened&hellip;
  </>
);

const paragraphs = [
  <>
    After a decade of doubt, I was ready to walk away from Christianity for
    good. But before I closed the door, I decided to seriously examine what
    happened in Jerusalem 2,000 years ago: the Gospel writers, the rival
    explanations, the witnesses, and the case for the resurrection. What I
    found surprised me and eventually brought me back to Jesus.
  </>,
  <>
    That journey reshaped everything. My wife{" "}
    <a href="https://shelbyhanson.com" target="_blank" rel="noreferrer">
      Shelby
    </a>{" "}
    and I turned the podcast
    into{" "}
    <a href="https://faithlabshow.com" target="_blank" rel="noreferrer">
      Faith Lab
    </a>
    , where we sit down with scholars, academics, and archaeologists to
    explore the evidence behind the faith. I also built{" "}
    <a href="https://faithpods.com" target="_blank" rel="noreferrer">
      FaithPods
    </a>
    , a platform helping Christian podcasters sharpen their craft and reach
    more people.
  </>,
];

const work = [
  {
    name: "Faith Lab",
    description:
      "Conversations with leading scholars, academics, and archaeologists exploring the evidence for Christianity.",
    href: "https://faithlabshow.com",
    cta: "Visit Faith Lab",
  },
  {
    name: "FaithPods",
    description:
      "Helping Christian podcasters sharpen their craft, grow their audience, and find real community.",
    href: "https://faithpods.com",
    cta: "Explore FaithPods",
  },
];

export default function Home() {
  return (
    <>
      <div className={styles.accentBar} />
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.portraitWrap}>
            <Image
              src="/nate.jpg"
              alt="Nate Hanson"
              width={2699}
              height={2699}
              priority
              className={styles.portrait}
            />
          </div>
          <h1 className={styles.name}>Nate Hanson</h1>
          <div className={styles.roles}>
            <span>
              Co-host of{" "}
              <a
                href="https://faithlabshow.com"
                target="_blank"
                rel="noreferrer"
              >
                Faith Lab
              </a>
            </span>
            <span className={styles.dividerDot} aria-hidden="true" />
            <span>
              Founder of{" "}
              <a
                href="https://faithpods.com"
                target="_blank"
                rel="noreferrer"
              >
                FaithPods
              </a>
            </span>
          </div>
        </header>

        <hr className={styles.divider} />

        <section id="about" className={styles.about}>
          <p className={styles.lede}>{lede}</p>
          <div className={styles.aboutColumns}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.aboutParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        <section id="work" className={styles.section}>
          <p className={styles.sectionLabel}>Work</p>
          <div className={styles.workStack}>
            {work.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={styles.workCard}
              >
                <div className={styles.workContent}>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                <span className={styles.workCta}>
                  {item.cta}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}>Get in Touch</p>
            <p>
              Questions about the show? Head to{" "}
              <a
                href="https://faithlabshow.com/contact"
                target="_blank"
                rel="noreferrer"
              >
                faithlabshow.com/contact
              </a>
              .
            </p>
            <p>
              For everything else, drop me a note here.
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
