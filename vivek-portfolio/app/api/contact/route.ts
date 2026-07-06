import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * This currently validates the payload and logs it. To actually deliver
 * messages to your inbox, wire in an email provider — for example:
 *
 *   Resend:    https://resend.com/docs/send-with-nextjs
 *   SendGrid:  https://www.twilio.com/docs/sendgrid
 *
 * Add your API key as an environment variable (e.g. RESEND_API_KEY) in
 * `.env.local` and in your hosting provider's dashboard, then send the
 * email inside this handler before returning the response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // TODO: send the email via your provider of choice here.
    console.log("New contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
