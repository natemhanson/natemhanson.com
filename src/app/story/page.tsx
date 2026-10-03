import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, BackIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import shared from "../shared.module.css";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "The short story",
  description:
    "Why I think the best thing a family can have is time together, and why we built Arbor.",
  alternates: {
    canonical: "/story",
  },
};

export default function Story() {
  return (
    <SiteShell>
      <article className={styles.content}>
        <Link href="/" className={styles.back}>
          <BackIcon />
          Nate Hanson
        </Link>
        <p className={shared.label}>Why</p>
        <h1 className={styles.title}>The short story</h1>
        <p className={styles.lead}>
          I think the best thing a family can have is time together: a close
          home, and a childhood that isn&rsquo;t swallowed by school.
          Homeschooling gives families that time. The planning, the lessons,
          and the records are the wall.
        </p>
        <p className={styles.body}>
          That&rsquo;s why we built Arbor. It carries those hard parts so
          parents can stay at the table with their kids. That&rsquo;s the work
          that matters most to me right now: helping families raise their
          children well, build a strong home, and actually have the hours to
          spend with each other.
        </p>
        <p className={styles.signature}>&mdash; Nate</p>
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
      </article>
    </SiteShell>
  );
}
