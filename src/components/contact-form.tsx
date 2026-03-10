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
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState(initialState);

    if (!accessKey) {
      setState({
        error:
          "Form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel or use X instead.",
        success: null,
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            subject: "New message from natemhanson.com",
            from_name: "natemhanson.com",
            replyto: formData.get("email"),
            botcheck: formData.get("botcheck"),
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

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={7} required />
      </label>

      <input className={styles.botcheck} name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />

      <div className={styles.actions}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Message"}
        </button>
        {state.error ? <p className={styles.error}>{state.error}</p> : null}
        {state.success ? <p className={styles.success}>{state.success}</p> : null}
      </div>
    </form>
  );
}
