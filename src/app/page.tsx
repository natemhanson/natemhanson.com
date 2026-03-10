import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import styles from "./page.module.css";

const paragraphs = [
  <>
    I was a church planter and worship leader who lost his faith, started a
    podcast to talk about it, and watched that show grow to more than 2
    million downloads as people wrestled with the same questions alongside me.
  </>,
  <>
    Ten years of doubt and deconstruction led me to think Christianity was
    done for me. Before I closed the door completely, I decided to really look
    into what happened in Jerusalem almost 2,000 years ago: the Gospel
    writers, the rival explanations, the witnesses, the historical setting,
    and the case for the resurrection. I was surprised by what I found, and
    that eventually led me back to Jesus in a much more real way.
  </>,
  <>
    So I changed my podcast to{" "}
    <a href="https://faithlabshow.com" target="_blank" rel="noreferrer">
      Faith Lab
    </a>
    . My wife and I bring on Christian scholars, academics, and
    archaeologists to help people understand the strength of the Christian
    story. I also built{" "}
    <a href="https://faithpods.com" target="_blank" rel="noreferrer">
      FaithPods
    </a>
    .com to help other Christian podcasters connect with more people and grow
    their shows.
  </>,
];

const work = [
  {
    name: "Faith Lab",
    description:
      "A podcast with Nate and Shelby Hanson bringing top Christian scholars, academics, and archaeologists into clear public conversation.",
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
              Faith Lab, FaithPods, and work around faith, scholarship,
              Christian media, and meaningful conversation.
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
