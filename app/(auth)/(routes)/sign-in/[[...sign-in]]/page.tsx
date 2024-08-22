/**
 * @description This page custom is used to sign in from clerk
 * @see https://clerk.com/docs/references/nextjs/custom-signup-signin-pages
 */


import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}