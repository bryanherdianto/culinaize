import { SignIn } from '@clerk/nextjs';

// Catch-all segment is required: Clerk's <SignIn /> renders its own sub-routes
// (SSO callback, verification steps) underneath this path.
export default function Page() {
  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <SignIn fallbackRedirectUrl="/chat" signUpUrl="/login" />
      </div>
    </div>
  );
}
