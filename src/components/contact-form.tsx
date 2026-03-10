"use client";

import { FormEvent, useState, useTransition } from "react";
import styles from "./contact-form.module.css";

type FormState = {
  error: string | null;
  success: string | null;
};

const initialState: FormState = {
  error: null,
  success: null,
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState(initialState);

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            showName: formData.get("showName"),
            website: formData.get("website"),
            message: formData.get("message"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = (await response.json()) as {
          error?: string;
          success?: string;
        };

        if (!response.ok) {
          setState({
            error: result.error ?? "Something went wrong. Try X instead.",
            success: null,
          });
          return;
        }

        form.reset();
        setState({
          error: null,
          success: result.success ?? "Message sent.",
        });
      } catch {
        setState({
          error: "Network error. Try again, or use X instead.",
          success: null,
        });
      }
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" type="text" required />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" required />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Podcast or publication</span>
          <input name="showName" type="text" required />
        </label>
        <label className={styles.field}>
          <span>Website</span>
          <input name="website" type="url" placeholder="https://..." />
        </label>
      </div>

      <label className={styles.field}>
        <span>What are you inviting Nate to talk about?</span>
        <textarea name="message" rows={7} required />
      </label>

      <div className={styles.actions}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Interview Request"}
        </button>
        {state.error ? <p className={styles.error}>{state.error}</p> : null}
        {state.success ? <p className={styles.success}>{state.success}</p> : null}
      </div>
    </form>
  );
}
