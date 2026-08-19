"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography } from "@material-tailwind/react"
import { BugAntIcon, CodeBracketIcon, UsersIcon } from "@heroicons/react/24/solid"

const REPO_URL = "https://github.com/bryanherdianto/culinaize"

const CHANNELS = [
  {
    icon: BugAntIcon,
    title: "Report an issue",
    description:
      "Found a bug, or got a recipe that was plainly wrong? Open an issue and we will see it.",
    linkLabel: "github.com/bryanherdianto/culinaize/issues",
    href: `${REPO_URL}/issues`,
  },
  {
    icon: CodeBracketIcon,
    title: "Read the source",
    description:
      "CulinAIze is open source. Browse the code, or open a pull request if you want to fix something yourself.",
    linkLabel: "github.com/bryanherdianto/culinaize",
    href: REPO_URL,
  },
  {
    icon: UsersIcon,
    title: "Who builds this",
    description: "Two people. See who we are and what each of us works on.",
    linkLabel: "Meet the team",
    href: "/team",
  },
]

export default function ContactUs() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[50vh] w-full bg-[url('/image/contact.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 size-full bg-gray-900/20" />
        <div className="grid min-h-screen sm:min-h-[50vh] px-8">
          <div className="container relative z-10 m-auto grid place-items-center text-center">
            <Typography variant="h1" color="white" className="md:max-w-full lg:max-w-3xl">
              Contact Us
            </Typography>
            <Typography variant="lead" color="white" className="mt-6 mb-10 w-full md:max-w-full lg:max-w-2xl">
              CulinAIze is a small open-source project, so everything happens on GitHub. That is the
              fastest way to reach us and the only one we actually watch.
            </Typography>
          </div>
        </div>
      </div>

      {/* Contact Channels */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <Typography variant="h2" color="blue-gray" className="mb-4">
              Get in Touch
            </Typography>
            <Typography variant="lead" className="mb-16 font-normal !text-gray-500">
              No support inbox and no ticket queue — just the repository. Issues get read.
            </Typography>
          </div>

          <div className="space-y-8">
            {CHANNELS.map(({ icon: Icon, title, description, linkLabel, href }) => {
              const isExternal = href.startsWith("http")
              return (
                <div key={title} className="flex items-start gap-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <Icon className="size-6 text-white" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                      {title}
                    </Typography>
                    <Typography className="mb-2 font-normal !text-gray-500">{description}</Typography>
                    <Typography
                      as="a"
                      href={href}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {linkLabel}
                    </Typography>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
