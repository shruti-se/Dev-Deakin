import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic email validation
function isValidEmail(email) {
  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

// Newsletter subscription endpoint
app.post("/subscribe", async (req, res) => {
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim()
      : "";

  if (!isValidEmail(email)) {
    return res.status(400).send("Please enter a valid email address.");
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return res.status(500).send("Email service is not configured.");
  }

  const message = {
    from: "onboarding@resend.dev",
    to: email,
    subject: "Subscription Received",
    html: `
      <h2>Thanks for subscribing!</h2>
      <p>You are now on the mailing list.</p>
    `,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(message),
    });

    console.log("Resend status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      return res
        .status(502)
        .send("Unable to send the confirmation email.");
    }

    console.log("Email sent successfully:", data.id);

    return res
      .status(200)
      .send("Subscription received! A confirmation email has been sent.");
  } catch (error) {
    console.error("Server error:", error);

    return res
      .status(500)
      .send("Something went wrong while sending the email.");
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
