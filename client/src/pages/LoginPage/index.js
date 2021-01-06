import React from "react";
import "./index.scss";
import LoginForm from "../../components/LoginForm";
import AuthBanner from "../../components/AuthBanner";

const LoginPage = () => {
  return (
    <div>
      <main className="login-page-container">
        <AuthBanner />
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
