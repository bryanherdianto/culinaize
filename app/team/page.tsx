"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Card, CardBody } from "@material-tailwind/react"

const TEAM_MEMBERS = [
  {
    name: "Bryan Herdianto",
    role: "Frontend Developer",
    bio: "Builds the CulinAIze web app — the chat interface, the site, and everything you click on.",
    github: "bryanherdianto",
  },
  {
    name: "Wesley Frederick Oh",
    role: "Backend Developer",
    bio: "Builds the n8n workflow behind the assistant, wiring Gemini and Spoonacular into the answers you get back.",
    github: null,
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function Team() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[50vh] w-full bg-[url('/image/teams.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 size-full bg-gray-900/20" />
        <div className="grid min-h-screen sm:min-h-[50vh] px-8">
          <div className="container relative z-10 m-auto grid place-items-center text-center">
            <Typography variant="h1" color="white" className="md:max-w-full lg:max-w-3xl">
              Meet Our Team
            </Typography>
            <Typography variant="lead" color="white" className="mt-6 mb-10 w-full md:max-w-full lg:max-w-2xl">
              The two people who built CulinAIze.
            </Typography>
          </div>
        </div>
      </div>

      {/* Team Introduction */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Who We Are
          </Typography>
          <Typography variant="lead" className="mb-16 font-normal !text-gray-500">
            CulinAIze is a two-person project: one of us on the app you are looking at, the other on the
            workflow that answers your questions. If you have found a bug or want to suggest something,
            the GitHub repository is the best place to reach us.
          </Typography>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="pb-28 px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.name} className="text-center">
                <CardBody>
                  <div className="mx-auto mb-6 grid size-32 place-items-center rounded-full bg-gray-900">
                    <Typography variant="h3" color="white">
                      {initials(member.name)}
                    </Typography>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {member.name}
                  </Typography>
                  <Typography variant="small" className="mb-4 font-medium text-gray-600 uppercase tracking-wide">
                    {member.role}
                  </Typography>
                  <Typography className="font-normal !text-gray-500">{member.bio}</Typography>
                  {member.github && (
                    <Typography
                      as="a"
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="small"
                      className="mt-4 inline-block font-medium text-gray-900 hover:underline"
                    >
                      @{member.github}
                    </Typography>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
