"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Card, CardBody } from "@material-tailwind/react"

// Bump this by hand whenever the terms below actually change.
const LAST_UPDATED = "19 August 2026"
const REPO_ISSUES_URL = "https://github.com/bryanherdianto/culinaize/issues"

export default function Terms() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[50vh] w-full bg-[url('/image/terms.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 size-full bg-gray-900/20" />
        <div className="grid min-h-screen sm:min-h-[50vh] px-8">
          <div className="container relative z-10 m-auto grid place-items-center text-center">
            <Typography variant="h1" color="white" className="md:max-w-full lg:max-w-3xl">
              Terms and Conditions
            </Typography>
            <Typography variant="lead" color="white" className="mt-6 mb-10 w-full md:max-w-full lg:max-w-2xl">
              Please read these terms and conditions carefully before using our service.
            </Typography>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl">
          <Typography variant="small" className="mb-8 font-normal !text-gray-500 text-center">
            Last updated: {LAST_UPDATED}
          </Typography>

          <div className="space-y-8">
            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  1. Acceptance of Terms
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  These Terms of Service (&quot;Terms&quot;) govern your use of our website located at culinaize.vercel.app (the &quot;Service&quot;)
                  operated by CulinAIze (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  2. Use License
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  Permission is granted to temporarily download one copy of the materials on CulinAIze&apos;s website for
                  personal, non-commercial transitory viewing only.
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-2">
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  3. AI-Generated Recipe Content
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  CulinAIze generates recipes, substitutions, and cooking guidance using an AI model working from a
                  third-party recipe database. Its output may be incomplete, out of date, or simply wrong, and it is
                  offered for general information only.
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-2">
                  Because of that, you remain responsible for what you cook and eat. In particular:
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-gray-500 ml-4">
                  <li>
                    <strong>Verify allergens yourself.</strong> Never rely on CulinAIze to tell you whether a dish is
                    safe for an allergy or intolerance. Check every ingredient label.
                  </li>
                  <li>
                    <strong>Follow proper food safety.</strong> Cooking temperatures, storage times, and handling
                    advice must be confirmed against a trusted food-safety source.
                  </li>
                  <li>
                    <strong>This is not medical, dietary, or nutritional advice.</strong> Speak to a qualified
                    professional about any condition, restriction, or medication that affects what you can eat.
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  4. User Accounts
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  You sign in with your GitHub account through our authentication provider, Clerk. We never see or
                  store a password for you, and we do not issue CulinAIze-specific credentials.
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Keeping your GitHub account secure is therefore your responsibility, and you are responsible for
                  activity carried out through it on this service.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  5. Disclaimer
                </Typography>
                <Typography className="font-normal !text-gray-500 mb-4">
                  The materials on CulinAIze&apos;s website are provided on an &apos;as is&apos; basis. CulinAIze makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including without
                  limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Further, CulinAIze does not warrant or make any representations concerning the accuracy, likely results,
                  or reliability of the use of the materials on its website or otherwise relating to such materials or
                  on any sites linked to this site.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  6. Contact Information
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  If you have any questions about these Terms and Conditions, open an issue at{" "}
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
