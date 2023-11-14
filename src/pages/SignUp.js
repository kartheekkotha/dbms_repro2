// pages/signup.js
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import SignupForm from '@/components/SignupForm';

const SignupPage = () => {
  console.log("SignupPage");
  return (
    <div>
      <Head>
        <title>Sign Up Page</title>
      </Head>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
