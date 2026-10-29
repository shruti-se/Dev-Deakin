import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, loading } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Unable to log out. Please try again.");
    }
  }

  return (
    <nav className="h-10 flex items-center gap-8 px-2">
      <ul className="flex flex-row gap-[20px] list-none text-[#019bce] font-extrabold text-lg">
        <li><Link to="/">DEV@Deakin</Link></li>
        <li>About</li>
        <li>Work</li>
        <li>Contact</li>

        <li><Link to="/pricing">Pricing</Link></li>

        {!loading && !user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}

        {!loading && user && (
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}

        <li><Link to="/post">Post</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
