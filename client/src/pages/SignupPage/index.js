import React from "react";
import "./index.scss";
import RegisterForm from "../../components/RegisterForm";
import AuthBanner from "../../components/AuthBanner";

const SignupPage = () => {
  return (
    <main className="signup-page-container">
      <AuthBanner />
      <RegisterForm />
    </main>
  );
};

export default SignupPage;
