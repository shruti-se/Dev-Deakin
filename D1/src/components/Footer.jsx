// const Footer = () => {
//   return (
//     <footer className="w-full">

//       {/* Newsletter Signup */}
//       <div className="flex flex-wrap items-center justify-center gap-3 bg-gray-100 px-4 py-3">
//         <h2 className="text-lg font-bold tracking-wide">
//           SIGN UP FOR OUR DAILY INSIDER
//         </h2>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-56 h-8 border rounded border-gray-400 bg-white px-3 py-2 text-sm outline-none"
//         />

//         <button className="bg-gray-300 h-8 rounded px-5 py-2 text-sm font-medium hover:bg-gray-400">
//           Subscribe
//         </button>
//       </div>

//       {/* Main Footer */}
//       <div className="bg-[#07979A] px-8 py-6 text-black">

//         {/* Footer Columns */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

//           {/* Explore */}
//           <div>
//             <h3 className="mb-3 text-xl font-bold">
//               Explore
//             </h3>

//             <ul className="space-y-1 text-sm">
//               <li>
//                 <a href="#" className="hover:underline">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:underline">
//                   Questions
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:underline">
//                   Articles
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:underline">
//                   Tutorials
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="mb-3 text-xl font-bold">
//               Support
//             </h3>

//             <ul className="space-y-1 text-sm">
//               <li>
//                 <a href="#" className="hover:underline">
//                   FAQs
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:underline">
//                   Help
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:underline">
//                   Contact Us
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Stay Connected */}
//           <div>
//             <h3 className="mb-3 text-xl font-bold">
//               Stay connected
//             </h3>

//             <div className="flex gap-3">
//               <a
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
//               >
//                 F
//               </a>

//               <a
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
//               >
//                 T
//               </a>

//               <a
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
//               >
//                 I
//               </a>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Section */}
//         <div className="mt-8 text-center">

//           <h3 className="text-xl font-bold">
//             DEV@Deakin 2026
//           </h3>

//           <div className="mt-3 flex flex-wrap justify-center gap-12 text-sm">
//             <a href="#" className="hover:underline">
//               Privacy Policy
//             </a>

//             <a href="#" className="hover:underline">
//               Terms
//             </a>

//             <a href="#" className="hover:underline">
//               Code of Conduct
//             </a>
//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { useState } from "react";

const Footer = () => {
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
        body: JSON.stringify({
          email: email.trim(),
        }),
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
    <footer className="w-full">

      {/* Newsletter Signup */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-gray-100 px-4 py-3">
        <h2 className="text-lg font-bold tracking-wide">
          SIGN UP FOR OUR DAILY INSIDER
        </h2>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="h-8 w-56 rounded border border-gray-400 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-8 rounded bg-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`w-full text-center text-sm ${
              isError ? "text-red-600" : "text-green-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Main Footer */}
      <div className="bg-[#07979A] px-8 py-6 text-black">

        {/* Footer Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Explore */}
          <div>
            <h3 className="mb-3 text-xl font-bold">
              Explore
            </h3>

            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Questions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-xl font-bold">
              Support
            </h3>

            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="mb-3 text-xl font-bold">
              Stay connected
            </h3>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
              >
                F
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
              >
                T
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white hover:bg-gray-700"
              >
                I
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center">

          <h3 className="text-xl font-bold">
            DEV@Deakin 2026
          </h3>

          <div className="mt-3 flex flex-wrap justify-center gap-12 text-sm">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>

            <a href="#" className="hover:underline">
              Terms
            </a>

            <a href="#" className="hover:underline">
              Code of Conduct
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
