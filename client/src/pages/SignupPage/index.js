import React from "react";
import RegisterForm from "../../components/RegisterForm";
import AuthLayout from "../../components/Layout/Auth";

const SignupPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default SignupPage;
