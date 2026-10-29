
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/AuthContext";

function Pricing() {
  const { user, loading } = useAuth();

  const [plan, setPlan] = useState("Free");
  const [planLoading, setPlanLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const primaryButton =
    "bg-[#00A6CE] text-white rounded-lg px-6 py-3 hover:bg-[#008FB3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const secondaryButton =
    "border border-gray-300 text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors";

  useEffect(() => {
    async function fetchPlan() {
      if (!user) {
        setPlan("Free");
        setPlanLoading(false);
        return;
      }

      setPlanLoading(true);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setPlan(userSnapshot.data().plan || "Free");
        } else {
          setPlan("Free");
        }
      } catch (err) {
        console.error("Error fetching subscription plan:", err);
        setError("Unable to load your subscription plan. Please try again.");
      } finally {
        setPlanLoading(false);
      }
    }

    fetchPlan();
  }, [user]);

  function openModal() {
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setError("");
    setSuccess("");
    setCardHolder("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  }

  async function handleUpgrade(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Please log in before upgrading your plan.");
      return;
    }

    if (plan === "Paid") {
      setError("Your account already has the Paid plan.");
      return;
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    if (!cardHolder.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }

    if (!/^\d{16}$/.test(cleanCardNumber)) {
      setError("Card number must contain exactly 16 digits.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setError("Enter the expiry date in MM/YY format.");
      return;
    }

    const [month, year] = expiryDate.split("/");
    const expiryMonth = Number(month);
    const expiryYear = 2000 + Number(year);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      setError("The card expiry date has passed.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("CVV must contain 3 or 4 digits.");
      return;
    }

    setUpgrading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          plan: "Paid",
          upgradedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setPlan("Paid");
      setSuccess("Your plan has been upgraded to Paid successfully.");

      // Clear the card details from the form state.
      setCardHolder("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } catch (err) {
      console.error("Error upgrading subscription:", err);
      setError("Unable to upgrade your plan. Please try again.");
    } finally {
      setUpgrading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>

      {user && !planLoading && (
        <p className="mb-6">
          Your current plan:{" "}
          <span className="font-bold">{plan}</span>
        </p>
      )}

      {error && !showModal && (
        <p className="text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">Free Plan</h2>
          <p className="mb-4">Access the basic features.</p>
          <p className="text-xl font-semibold">$0</p>

          {user && plan === "Free" && (
            <p className="mt-4">Your current plan.</p>
          )}
        </div>

        {/* Paid Plan */}
        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">Paid Plan</h2>
          <p className="mb-4">Access the premium features.</p>
          <p className="text-xl font-semibold">$10</p>

          {!loading && !user && (
            <p className="mt-4">
              Please{" "}
              <Link to="/login" className="text-[#00A6CE] underline">
                log in
              </Link>{" "}
              to upgrade.
            </p>
          )}

          {user && plan === "Paid" && !planLoading && (
            <p className="mt-4 font-semibold text-green-700">
              Your current plan.
            </p>
          )}

          {user && plan === "Free" && !planLoading && (
            <button
              type="button"
              className={`mt-4 ${primaryButton}`}
              onClick={openModal}
            >
              Upgrade Plan
            </button>
          )}

          {user && planLoading && (
            <p className="mt-4 text-gray-500">
              Loading your plan...
            </p>
          )}
        </div>
      </div>

      {/* Payment Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Upgrade to Paid Plan
            </h2>

            <form onSubmit={handleUpgrade}>
              <label className="block mb-1">Cardholder name</label>
              <input
                type="text"
                className="border rounded-lg p-2 w-full mb-3"
                value={cardHolder}
                onChange={(event) => setCardHolder(event.target.value)}
                autoComplete="cc-name"
                required
              />

              <label className="block mb-1">
                Card number (16 digits)
              </label>
              <input
                type="text"
                className="border rounded-lg p-2 w-full mb-3"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                inputMode="numeric"
                autoComplete="off"
                placeholder="1234567812345678"
                maxLength={19}
                required
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full mb-3"
                    value={expiryDate}
                    onChange={(event) => setExpiryDate(event.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    autoComplete="cc-exp"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-1">CVV</label>
                  <input
                    type="password"
                    className="border rounded-lg p-2 w-full mb-3"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-600 mb-3" role="alert">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-green-700 mb-3" role="status">
                  {success}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-2">
                {!success && (
                  <button
                    type="submit"
                    className={primaryButton}
                    disabled={upgrading}
                  >
                    {upgrading ? "Upgrading..." : "Confirm Upgrade"}
                  </button>
                )}

                <button
                  type="button"
                  className={secondaryButton}
                  onClick={closeModal}
                  disabled={upgrading}
                >
                  {success ? "Close" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;
