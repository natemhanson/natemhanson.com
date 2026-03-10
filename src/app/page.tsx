import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import styles from "./page.module.css";

const credibility = [
  "Produced the largest Christian radio talk show in America",
  "Built and hosted podcasts with more than 2 million downloads",
  "Interviews that span scholars, skeptics, pastors, and cultural voices",
];

const topics = [
  "Faith and deconstruction",
  "Biblical scholarship for everyday people",
  "Christian media and podcast growth",
  "What makes a message actually resonate",
];

const paragraphs = [
  <>
    I host <a href="https://faithlabshow.com" target="_blank" rel="noreferrer">Faith Lab</a>, a
    show with Shelby that brings serious biblical scholarship out of academic
    settings and into conversations everyday people can actually follow.
  </>,
  <>
    Before that, I spent years in ministry, then walked through a long season
    of deconstruction, and eventually found myself drawn back into the
    historical, textual, and philosophical foundations of Christianity. That
    path led to <a href="https://almostheretical.com" target="_blank" rel="noreferrer">Almost
    Heretical</a>, more than 2 million downloads, and a lot of conversations
    with people trying to figure out what holds up when easy answers do not.
  </>,
  <>
    I also built <a href="https://faithpods.com" target="_blank" rel="noreferrer">FaithPods</a>{" "}
    because Christian podcasters deserve better tools, better strategy, and a
    stronger sense that they are not building alone.
  </>,
];

const work = [
  {
    name: "Faith Lab",
    description:
      "A podcast with Nate and Shelby Hanson that brings serious biblical scholarship into clear, usable conversations for everyday listeners.",
    href: "https://faithlabshow.com",
    cta: "Visit Faith Lab",
  },
  {
    name: "FaithPods",
    description:
      "Tools and community for Christian podcasters who want better strategy, stronger craft, and more meaningful reach.",
    href: "https://faithpods.com",
    cta: "Explore FaithPods",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.topbar}>
          <p className={styles.wordmark}>Nate Hanson</p>
          <nav className={styles.nav}>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#book">Book Nate</a>
          </nav>
        </div>

        <div className={styles.headerBlock}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitFrame}>
              <Image
                src="/nate.jpg"
                alt="Nate Hanson"
                width={2699}
                height={2699}
                priority
                className={styles.portrait}
              />
            </div>
          </div>

          <div className={styles.heroCopy}>
            <h1>Nate Hanson</h1>
            <p className={styles.heroSubhead}>
              Faith Lab. FaithPods. Interviews about faith, scholarship, media,
              and building things that matter.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#book">
                Book Nate for an Interview
              </a>
              <a
                className={styles.secondaryAction}
                href="https://faithlabshow.com"
                target="_blank"
                rel="noreferrer"
              >
                Visit Faith Lab
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={styles.storySection}>
        <div className={styles.longform}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.credSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>Why Me</p>
          <h2>The short case for bringing me onto your show.</h2>
        </div>

        <div className={styles.credGrid}>
          {credibility.map((item, index) => (
            <article key={item} className={styles.credCard}>
              <span className={styles.credNumber}>0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className={styles.workSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>Current Work</p>
          <h2>Two things I am building hard right now.</h2>
        </div>

        <div className={styles.workGrid}>
          {work.map((item) => (
            <article key={item.name} className={styles.workCard}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.topicSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionLabel}>Interview Topics</p>
          <h2>Good territory if you want me on your show.</h2>
        </div>

        <div className={styles.topicWrap}>
          {topics.map((topic) => (
            <span key={topic} className={styles.topicChip}>
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section id="book" className={styles.contactSection}>
        <div className={styles.contactIntro}>
          <p className={styles.sectionLabel}>Book Nate</p>
          <h2>Use the form if you want to invite me onto your podcast.</h2>
          <p>
            For Faith Lab show questions, use{" "}
            <a href="https://faithlabshow.com/contact" target="_blank" rel="noreferrer">
              faithlabshow.com/contact
            </a>
            . If you just want to reach me directly, you can also message me on{" "}
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
