import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { X_PROFILE_URL } from "@/lib/x-posts";
import shared from "./shared.module.css";
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
          <div className={shared.actions}>
            <a
              href="https://arborhomeschool.com"
              target="_blank"
              rel="noreferrer"
              className={shared.primary}
            >
              See Arbor
              <ArrowIcon />
            </a>
            <Link href="/contact" className={shared.secondary}>
              Say hi
            </Link>
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
            <p className={shared.label}>What I&rsquo;m building</p>
            <h2 id="arbor-heading" className={styles.arborTitle}>
              Arbor
            </h2>
            <p className={styles.arborText}>
              A whole homeschool year, planned around your kid. My wife{" "}
              <a
                href="https://shelbyhanson.com"
                target="_blank"
                rel="noreferrer"
                className={shared.inlineLink}
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
            <h2 id="why-heading" className={shared.label}>
              Why
            </h2>
            <p className={styles.why}>
              I think the best thing a family can have is time together: a
              close home, and a childhood that isn&rsquo;t swallowed by
              school.{" "}
              <Link href="/story" className={`${shared.inlineLink} ${styles.storyLink}`}>
                Read the short story
              </Link>
            </p>
          </section>

          <section className={styles.section} aria-labelledby="before-heading">
            <h2 id="before-heading" className={shared.label}>
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
                className={shared.inlineLink}
              >
                Buffer
              </a>{" "}
              and host{" "}
              <a
                href="https://faithlabshow.com"
                target="_blank"
                rel="noreferrer"
                className={shared.inlineLink}
              >
                Faith Lab
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
