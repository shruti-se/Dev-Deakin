import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Deakin from "./components/Deakin";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Tutorials from "./components/Tutorials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Post from "./pages/Post";
import { AuthProvider } from "./components/AuthContext";
import Pricing from "./pages/Pricing";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Deakin />
                  <Profile />
                  <Projects />
                  <Articles />
                  <Tutorials />
                  <Gallery />
                </main>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route path="/post" element={<Post />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;