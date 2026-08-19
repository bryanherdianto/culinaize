"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";

const STEPS = [
  {
    number: "01",
    title: "Sign in with GitHub",
    description:
      "One click, no password to invent, no card. You are in and the assistant knows who it is talking to.",
  },
  {
    number: "02",
    title: "Say what you have",
    description:
      "List your ingredients, your dietary restrictions and how long you have got — or just paste a photo of what is in the fridge.",
  },
  {
    number: "03",
    title: "Cook",
    description:
      "Get a recipe pulled from a real recipe database, with the steps to make it and tips if you ask for them.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-8 pt-40 pb-20">
      <div className="flex mb-16 flex-col items-center">
        <Typography variant="h2" className="text-center mb-2" color="blue-gray">
          How It Works
        </Typography>
        <Typography
          variant="lead"
          className="mb-3 w-full text-center font-normal !text-gray-500 lg:w-10/12"
        >
          Three steps from an empty plan to something you can actually cook tonight.
        </Typography>
      </div>
      <div className="container mx-auto !rounded-lg bg-[url('/image/Background.png')] bg-center px-10 py-14 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col items-start">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 font-bold opacity-40"
              >
                {number}
              </Typography>
              <Typography variant="h5" color="white" className="mb-2">
                {title}
              </Typography>
              <Typography
                variant="paragraph"
                color="white"
                className="font-normal opacity-80"
              >
                {description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
