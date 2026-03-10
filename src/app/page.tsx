import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import styles from "./page.module.css";

const paragraphs = [
  <>
    I host{" "}
    <a href="https://faithlabshow.com" target="_blank" rel="noreferrer">
      Faith Lab
    </a>
    , a show with Shelby that brings serious biblical scholarship out of
    academic settings and into conversations everyday people can actually
    follow.
  </>,
  <>
    Before that, I spent years in ministry, then walked through a long season
    of deconstruction, and eventually found myself drawn back into the
    historical, textual, and philosophical foundations of Christianity. That
    path led to{" "}
    <a href="https://almostheretical.com" target="_blank" rel="noreferrer">
      Almost Heretical
    </a>
    , more than 2 million downloads, and a lot of conversations with people
    trying to figure out what holds up when easy answers do not.
  </>,
  <>
    I also built{" "}
    <a href="https://faithpods.com" target="_blank" rel="noreferrer">
      FaithPods
    </a>{" "}
    because Christian podcasters deserve better tools, better strategy, and a
    stronger sense that they are not building alone.
  </>,
];

const work = [
  {
    name: "Faith Lab",
    description:
      "A podcast with Nate and Shelby Hanson about serious scholarship, real questions, and the Christian story.",
    href: "https://faithlabshow.com",
    cta: "Visit Faith Lab",
  },
  {
    name: "FaithPods",
    description:
      "Tools and community for Christian podcasters who want better craft, better strategy, and better support.",
    href: "https://faithpods.com",
    cta: "Explore FaithPods",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.topbar}>
          <p className={styles.wordmark}>Nate Hanson</p>
          <nav className={styles.nav}>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className={styles.intro}>
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

          <div className={styles.titleBlock}>
            <h1>Nate Hanson</h1>
            <p>
              Faith Lab, FaithPods, and work around faith, scholarship, media,
              and meaningful conversations.
            </p>
          </div>
        </div>
      </header>

      <section id="about" className={styles.about}>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section id="work" className={styles.section}>
        <p className={styles.sectionLabel}>Work</p>
        <div className={styles.workGrid}>
          {work.map((item) => (
            <article key={item.name} className={styles.workCard}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactCopy}>
          <p className={styles.sectionLabel}>Contact</p>
          <p>
            For Faith Lab show questions, use{" "}
            <a href="https://faithlabshow.com/contact" target="_blank" rel="noreferrer">
              faithlabshow.com/contact
            </a>
            .
          </p>
          <p>
            If you want to reach me directly, use the form or message me on{" "}
            <a href="https://x.com/natemhanson" target="_blank" rel="noreferrer">
              X
            </a>
            .
          </p>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
