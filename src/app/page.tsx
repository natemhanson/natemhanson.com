import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { ArrowIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { X_PROFILE_URL } from "@/lib/x-posts";
import styles from "./page.module.css";

const BEFORE_ARBOR = [
  "Pastor and church planter, inner-city SF",
  "Inner-city nonprofit work, SF",
  "Crazy Love Ministries, with Francis Chan",
  "Built and sold Sumry and Work Different",
];

export default function Home() {
  return (
    <SiteShell>
      <div className={styles.columns}>
        <section className={styles.intro}>
          <Image
            src="/nate.jpg"
            alt="Nate Hanson"
            width={1254}
            height={1254}
            priority
            sizes="112px"
            className={styles.portrait}
          />
          <h1 className={styles.name}>Nate Hanson</h1>
          <p className={styles.lede}>
            I&rsquo;m a dad and a builder. I started Arbor to take the hard
            parts of homeschooling off parents&rsquo; plates, so more families
            can raise their kids together.
          </p>
          <div className={styles.actions}>
            <a
              href="https://arborhomeschool.com"
              target="_blank"
              rel="noreferrer"
              className={styles.primary}
            >
              See Arbor
              <ArrowIcon />
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
        </section>

        <div className={styles.details}>
          <section className={styles.arbor} aria-labelledby="arbor-heading">
            <p className={styles.label}>What I&rsquo;m building</p>
            <h2 id="arbor-heading" className={styles.arborTitle}>
              Arbor
            </h2>
            <p className={styles.arborText}>
              A whole homeschool year, planned around your kid. My wife{" "}
              <a
                href="https://shelbyhanson.com"
                target="_blank"
                rel="noreferrer"
                className={styles.inlineLink}
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
              arborhomeschool.com
              <ArrowIcon />
            </a>
          </section>

          <section className={styles.section} aria-labelledby="why-heading">
            <h2 id="why-heading" className={styles.label}>
              Why
            </h2>
            <p className={styles.why}>
              I think the best thing a family can have is time together: a
              close home, and a childhood that isn&rsquo;t swallowed by school.
              Homeschooling gives families that time. The planning, the
              lessons, and the records are the wall.
            </p>
            <p className={styles.why}>
              That&rsquo;s why we built Arbor. It carries those hard parts so
              parents can stay at the table with their kids. That&rsquo;s the
              work that matters most to me right now: helping families raise
              their children well, build a strong home, and actually have the
              hours to spend with each other.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="before-heading">
            <h2 id="before-heading" className={styles.label}>
              Before Arbor
            </h2>
            <ul className={styles.tags}>
              {BEFORE_ARBOR.map((chapter) => (
                <li key={chapter}>{chapter}</li>
              ))}
            </ul>
            <p className={styles.also}>
              I also help build{" "}
              <a
                href="https://buffer.com"
                target="_blank"
                rel="noreferrer"
                className={styles.inlineLink}
              >
                Buffer
              </a>{" "}
              and host{" "}
              <a
                href="https://faithlabshow.com"
                target="_blank"
                rel="noreferrer"
                className={styles.inlineLink}
              >
                Faith Lab
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <section
        id="contact"
        className={styles.contact}
        aria-labelledby="contact-heading"
      >
        <div className={styles.contactCopy}>
          <h2 id="contact-heading" className={styles.contactTitle}>
            Say hi.
          </h2>
          <p className={styles.contactLead}>
            Want to talk about Arbor, family, or anything else? Write me here,
            or find me on{" "}
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
    </SiteShell>
  );
}
