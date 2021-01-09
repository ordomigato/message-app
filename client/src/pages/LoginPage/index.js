import React from "react";
import LoginForm from "../../components/LoginForm";
import AuthLayout from "../../components/Layout/Auth";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
