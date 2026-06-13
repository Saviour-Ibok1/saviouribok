import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    // Log env vars presence (not values) to help debug
    console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
    console.log("CONTACT_EMAIL present:", !!process.env.CONTACT_EMAIL);
    console.log("Sending to:", process.env.CONTACT_EMAIL);

    const { data, error } = await resend.emails.send({
      from:    "onboarding@resend.dev",
      to:      process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `[saviouribok.com] ${subject || "New message"} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="font-size: 20px; margin: 0 0 24px; color: #1a1714;">
            New message from saviouribok.com
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #7a7570; font-size: 13px; width: 100px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #1a1714; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #7a7570; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #1a1714; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #7a7570; font-size: 13px;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edeae4; color: #1a1714; font-size: 14px;">${subject || "—"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #7a7570; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #1a1714; font-size: 14px; line-height: 1.75; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #edeae4;">
            <p style="color: #7a7570; font-size: 12px; margin: 0;">
              Sent from saviouribok.com · Reply directly to respond to ${name}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      // Log the full Resend error so we can see exactly what went wrong
      console.error("Resend error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    console.log("Email sent successfully, id:", data?.id);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact route exception:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}