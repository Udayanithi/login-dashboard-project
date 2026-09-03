import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  FolderKanban,
  ShieldCheck,
  LogIn
} from "lucide-react";

import "./App.css";
import Dashboard from "./Dashboard";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  const handleLogin = async (event) => {

    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        if (rememberMe) {
          localStorage.setItem(
            "rememberMe",
            "true"
          );
        }

        navigate("/dashboard");

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the server"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      {/* Background effects */}

      <div className="glow glow-blue"></div>
      <div className="glow glow-purple"></div>


      <div className="login-wrapper">


        {/* LEFT SIDE */}

        <section className="brand-section">

          <div className="brand-logo">

            <div className="logo-icon">
              <BarChart3 size={28} />
            </div>

            <span>
              Work<span>Tracker</span>
            </span>

          </div>


          <div className="brand-content">

            <p className="small-heading">
              YOUR WORKSPACE
            </p>

            <h1>
              Welcome
              <span> Back!</span>
            </h1>

            <p className="brand-description">
              Sign in to your account and continue
              managing your work from one powerful
              dashboard.
            </p>


            <div className="features">


              <div className="feature">

                <div className="feature-icon">
                  <BarChart3 size={22} />
                </div>

                <div>
                  <h3>Track Your Progress</h3>

                  <p>
                    Monitor your work and progress
                    in real-time.
                  </p>
                </div>

              </div>


              <div className="feature">

                <div className="feature-icon">
                  <FolderKanban size={22} />
                </div>

                <div>
                  <h3>Manage Projects</h3>

                  <p>
                    Organize and manage all your
                    projects efficiently.
                  </p>
                </div>

              </div>


              <div className="feature">

                <div className="feature-icon">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h3>Secure & Reliable</h3>

                  <p>
                    Your data is protected and
                    securely managed.
                  </p>
                </div>

              </div>


            </div>

          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="form-section">


          <div className="login-card">

            <div className="form-header">

              <div className="mobile-logo">

                <div className="logo-icon">
                  <BarChart3 size={24} />
                </div>

                <span>
                  Work<span>Tracker</span>
                </span>

              </div>

              <h2>Login</h2>

              <p>
                Welcome back! Please login to
                continue.
              </p>

            </div>


            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

                <div className="input-wrapper">

                  <Mail
                    className="input-icon"
                    size={20}
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <LockKeyhole
                    className="input-icon"
                    size={20}
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                  />

                  <span className="custom-checkbox">
                    ✓
                  </span>

                  <span>
                    Remember me
                  </span>

                </label>


                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setMessage(
                      "Password recovery will be available soon."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>


              {/* ERROR / STATUS */}

              {message && (

                <div
                  className={
                    message === "Login successful"
                      ? "success-message"
                      : "error-message"
                  }
                >
                  {message}
                </div>

              )}


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Login
                    <ArrowRight size={18} />
                  </>
                )}

              </button>


            </form>


            {/* REGISTER */}

            <div className="divider">

              <span>OR</span>

            </div>


            <p className="register-text">

              Don't have an account?

              <button
                type="button"
                onClick={() => {
                  setMessage(
                    "Registration will be available soon."
                  );
                }}
              >
                Create account
              </button>

            </p>


          </div>


          <p className="copyright">
            © 2026 WorkTracker. All rights reserved.
          </p>

        </section>

      </div>

    </div>

  );
}


function DashboardPage() {

  const navigate = useNavigate();

  const storedUser =
    localStorage.getItem("user");

  if (!storedUser) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  const user = JSON.parse(storedUser);


  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };


  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );

}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;