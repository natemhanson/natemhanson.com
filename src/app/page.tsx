import Image from "next/image";
import styles from "./page.module.css";

const proofPoints = [
  "Host of Almost Heretical, with more than 2 million downloads",
  "Works at Buffer, inside one of the most transparent companies on the internet",
  "Helps creators shape podcasts that actually grow and last",
];

const currentWork = [
  {
    title: "Almost Heretical",
    description:
      "Long-form conversations for people untangling faith, certainty, and the stories they inherited.",
    href: "https://almostheretical.com",
    label: "Listen to the podcast",
  },
  {
    title: "PowerPod",
    description:
      "A hands-on accelerator for thoughtful creators who want a podcast with real strategy behind it.",
    href: "https://tally.so/r/3jJEbx",
    label: "Apply for PowerPod",
  },
  {
    title: "Buffer",
    description:
      "Remote work, customer support, and the future of healthier internet businesses.",
    href: "https://buffer.com",
    label: "See Buffer",
  },
];

const topics = [
  "Podcast growth",
  "Deconstruction and faith",
  "Meaningful work",
  "Remote teams",
  "Family and creativity",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.navRow}>
          <p className={styles.kicker}>Nate Hanson</p>
          <nav className={styles.nav}>
            <a href="#work">Work</a>
            <a href="#topics">Topics</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Podcasting. Faith. Work. Ideas.</p>
            <h1>
              I help people think more clearly, build more honestly, and make
              work worth showing up for.
            </h1>
            <p className={styles.lead}>
              I host a podcast, work at Buffer, coach creators, and keep
              gravitating toward conversations that are a little more human than
              the internet usually allows.
            </p>

            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href="https://almostheretical.com"
                target="_blank"
                rel="noreferrer"
              >
                Listen to Almost Heretical
              </a>
              <a className={styles.secondaryAction} href="#contact">
                Book Nate on Your Podcast
              </a>
            </div>
          </div>

          <div className={styles.portraitWrap}>
            <div className={styles.portraitCard}>
              <Image
                src="/nateblue.jpg"
                alt="Portrait of Nate Hanson"
                width={1280}
                height={1265}
                priority
                className={styles.portrait}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Snapshot</p>
          <h2>Not a corporate bio. Just the useful version.</h2>
        </div>
        <div className={styles.proofGrid}>
          {proofPoints.map((item, index) => (
            <article key={item} className={styles.proofCard}>
              <span className={styles.proofIndex}>0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className={styles.workSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Current Work</p>
          <h2>Three lanes I keep coming back to.</h2>
        </div>
        <div className={styles.workGrid}>
          {currentWork.map((item) => (
            <article key={item.title} className={styles.workCard}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="topics" className={styles.topicSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Conversations</p>
          <h2>If you want me on your show, this is the territory.</h2>
        </div>
        <div className={styles.topicPanel}>
          <div className={styles.topicList}>
            {topics.map((topic) => (
              <span key={topic} className={styles.topicChip}>
                {topic}
              </span>
            ))}
          </div>
          <p className={styles.topicBody}>
            The through-line is usually the same: what happens when inherited
            scripts stop working and people decide to build a better one.
          </p>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div>
          <p className={styles.sectionLabel}>Contact</p>
          <h2>Bring me in when the conversation needs depth, not noise.</h2>
        </div>
        <div className={styles.contactCard}>
          <p>
            For Almost Heretical inquiries:
            <br />
            <a href="mailto:contact@almostheretical.com">
              contact@almostheretical.com
            </a>
          </p>
          <p>
            For podcast guest requests or creator work:
            <br />
            <a href="mailto:natemhanson@gmail.com">natemhanson@gmail.com</a>
          </p>
          <div className={styles.contactLinks}>
            <a href="https://x.com/natemhanson" target="_blank" rel="noreferrer">
              X
            </a>
            <a
              href="https://www.linkedin.com/in/natemhanson/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
