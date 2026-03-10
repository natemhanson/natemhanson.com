import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: string;
  email?: string;
  showName?: string;
  website?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;

  const name = clean(body.name);
  const email = clean(body.email);
  const showName = clean(body.showName);
  const website = clean(body.website);
  const message = clean(body.message);

  if (!name || !email || !showName || !message) {
    return NextResponse.json(
      { error: "Please fill out the required fields." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Website Contact <onboarding@resend.dev>";

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      {
        error:
          "Form email is not configured yet. Use X for now, or finish the Vercel email env vars.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(resendApiKey);

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Interview request from ${name} (${showName})`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Show: ${showName}`,
      website ? `Website: ${website}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return NextResponse.json({
    success: "Request sent. Nate will see it privately by email.",
  });
}
