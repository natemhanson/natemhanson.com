import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { BackIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { X_PROFILE_URL } from "@/lib/x-posts";
import shared from "../shared.module.css";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Want to talk about Arbor, family, or anything else? Write me here.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <SiteShell>
      <div className={styles.split}>
        <div className={styles.content}>
          <Link href="/" className={styles.back}>
            <BackIcon />
            Nate Hanson
          </Link>
          <h1 className={styles.title}>Say hi.</h1>
          <p className={styles.lead}>
            Want to talk about Arbor, family, or anything else? Write me here,
            or find me on{" "}
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className={shared.inlineLink}
            >
              X
            </a>
            .
          </p>
        </div>
        <div className={styles.formColumn}>
          <ContactForm />
        </div>
      </div>
    </SiteShell>
  );
}
