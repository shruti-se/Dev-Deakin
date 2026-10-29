
import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || "Subscription failed.");
      }

      setMessage(result);
      setEmail("");
    } catch (error) {
      setMessage(
        error.message || "Unable to subscribe. Please try again."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-slate-900 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Subscribe to Our Newsletter
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
          Stay updated with the latest articles, tutorials and projects.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            autoComplete="email"
            required
            className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-sm ${
              isError ? "text-red-300" : "text-teal-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
