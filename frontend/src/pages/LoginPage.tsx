import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/auth";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../config/settings";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, currentUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);
      localStorage.setItem("auth", token);
    }
  }, [setToken, navigate]);

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const form = document.createElement("form");
    form.method = "GET";
    form.action = `${BACKEND_URL}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-4">
        {currentUser ? (
          <Link to="/transactions" className="btn btn-accent gap-2 w-full">
            To TopPage
          </Link>
        ) : (
          <>
            <button className="btn btn-accent gap-2 w-full" onClick={handleGoogleAuth}>
              Google Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginPage;
