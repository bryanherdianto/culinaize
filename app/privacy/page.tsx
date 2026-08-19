"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Card, CardBody } from "@material-tailwind/react"

// Bump this by hand whenever the policy below actually changes.
const LAST_UPDATED = "19 August 2026"
const REPO_ISSUES_URL = "https://github.com/bryanherdianto/culinaize/issues"

export default function Privacy() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[50vh] w-full bg-[url('/image/privacy.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 size-full bg-gray-900/20" />
        <div className="grid min-h-screen sm:min-h-[50vh] px-8">
          <div className="container relative z-10 m-auto grid place-items-center text-center">
            <Typography variant="h1" color="white" className="md:max-w-full lg:max-w-3xl">
              Privacy Policy
            </Typography>
            <Typography variant="lead" color="white" className="mt-6 mb-10 w-full md:max-w-full lg:max-w-2xl">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </Typography>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl">
          <Typography variant="small" className="mb-8 font-normal !text-gray-500 text-center">
            Last updated: {LAST_UPDATED}
          </Typography>

          <div className="space-y-8">
            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Information We Collect
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  CulinAIze collects very little, and there is no payment of any kind. What we handle is:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>
                    <strong>Your GitHub profile</strong> — name, username, email address, and avatar, released to us
                    by GitHub when you sign in. We never see your GitHub password.
                  </li>
                  <li>
                    <strong>The messages you send the assistant</strong>, including any photo you attach or paste.
                  </li>
                </ul>
                <Typography className="font-normal !text-gray-500 mt-4">
                  We do not collect payment details, and there is no account progress or history to collect: your
                  chat is held in the browser only and is gone the moment you refresh the page.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  How We Use Your Information
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  We use the information we collect to provide, maintain, and improve our services, including to:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>Identify you when you sign in, and show your name and avatar in the navigation bar</li>
                  <li>
                    Answer your cooking questions — your message and any attached photo are forwarded to our n8n
                    workflow, which passes them to Google Gemini and the Spoonacular recipe API
                  </li>
                  <li>Prevent abuse of the assistant</li>
                </ul>
                <Typography className="font-normal !text-gray-500 mt-4">
                  We do not sell your data, and we do not send marketing email.
                </Typography>
                <Typography className="font-normal !text-gray-500 mt-4">
                  Three third parties therefore process your data on our behalf: <strong>Clerk</strong> (sign-in and
                  the user record), <strong>Google Gemini</strong> (generating the answer), and{" "}
                  <strong>Spoonacular</strong> (the recipe data behind it). Each is subject to its own privacy policy.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Information Sharing
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy.
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-2">
                  We may share your information in the following situations:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Data Security
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  However, no method of transmission over the internet or electronic storage is 100% secure, so we
                  cannot guarantee absolute security.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Your Rights
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  You have certain rights regarding your personal information, including:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal information</li>
                  <li>Objection to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Cookies and Tracking
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  We do not run analytics, advertising, or tracking cookies of any kind.
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  The only cookies set are the session cookies our authentication provider, Clerk, needs to keep you
                  signed in. Blocking them will sign you out and prevent you from using the assistant.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Contact Us
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  If you have any questions about this Privacy Policy, open an issue at{" "}
                  <a href={REPO_ISSUES_URL} target="_blank" rel="noreferrer noopener" className="font-medium text-gray-900 hover:underline">
                    our GitHub issue tracker
                  </a>
                  , or see the contact page for the other ways to reach us.
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
