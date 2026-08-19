"use client"

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Card, CardBody } from "@material-tailwind/react"
import { MagnifyingGlassIcon, SparklesIcon, CameraIcon, LockOpenIcon } from "@heroicons/react/24/solid"

const STATS = [
  {
    icon: MagnifyingGlassIcon,
    title: "RAG-powered",
    description: "Answers are retrieved from real recipe data before they are written, not guessed.",
  },
  {
    icon: SparklesIcon,
    title: "Gemini + Spoonacular",
    description: "Gemini does the reasoning; Spoonacular supplies the recipes it reasons over.",
  },
  {
    icon: CameraIcon,
    title: "Photo input",
    description: "Snap or paste a picture of your ingredients instead of typing them out.",
  },
  {
    icon: LockOpenIcon,
    title: "Free",
    description: "No cost and no card. Sign in with GitHub and start cooking.",
  },
]

export default function AboutUs() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[50vh] w-full bg-[url('/image/about.jpg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 size-full bg-gray-900/20" />
        <div className="grid min-h-screen sm:min-h-[50vh] px-8">
          <div className="container relative z-10 m-auto grid place-items-center text-center">
            <Typography variant="h1" color="white" className="md:max-w-full lg:max-w-3xl">
              About Us
            </Typography>
            <Typography variant="lead" color="white" className="mt-6 mb-10 w-full md:max-w-full lg:max-w-2xl">
              We built a cooking assistant that starts from what is already in your kitchen, works around
              your diet and the time you have, and points you at a recipe you can actually make tonight.
            </Typography>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Our Mission
          </Typography>
          <Typography variant="lead" className="mb-16 font-normal !text-gray-500">
            Most cooking sites start with a recipe and send you shopping. We start from the other end:
            tell CulinAIze what you have, what you cannot eat, and how long you have got, and let it find
            something that fits.
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="text-center">
                <CardBody>
                  <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-gray-900">
                    <Icon className="size-8 text-white" />
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="font-normal !text-gray-500">{description}</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Typography variant="h2" color="blue-gray" className="mb-4">
                Our Story
              </Typography>
              <Typography variant="lead" className="mb-6 font-normal !text-gray-500">
                CulinAIze started in 2024 as a small project by the two of us, built around a question we kept running
                into ourselves: what do you cook when you have half a fridge of odds and ends and no plan?
              </Typography>
              <Typography className="mb-4 font-normal !text-gray-500">
                Under the hood it is a retrieval-augmented pipeline running in n8n. Your message goes to a
                workflow that pulls candidate recipes from Spoonacular and hands them to Gemini, so the
                answer you get back is grounded in a real recipe database rather than invented on the spot.
              </Typography>
              <Typography className="font-normal !text-gray-500">
                It is still small and still growing. If something is wrong or missing, the code is open and
                the issue tracker is the fastest way to tell us.
              </Typography>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl">
              <Image
                src="/image/food.jpg"
                alt="A spread of fresh ingredients on a kitchen counter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Our Values
          </Typography>
          <Typography variant="lead" className="mb-16 font-normal !text-gray-500">
            The principles that guide everything we do.
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Accuracy
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Recipes are grounded in real data, and we would rather say we do not know than make
                  something up. Always check allergens and food safety yourself.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Accessibility
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Free to use, works on the phone in your kitchen, and handles dietary restrictions and
                  intolerances as a first-class input rather than an afterthought.
                </Typography>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Zero Waste
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Cook what you already have. Every suggestion starts from the ingredients in your kitchen,
                  not from a shopping list.
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
