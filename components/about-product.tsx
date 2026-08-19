"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { ChefHat, Leaf, Camera } from "lucide-react";

import FeatureCard from "@/components/feature-card";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Cook From What You Have",
    description:
      "Tell it your ingredients and it finds a recipe that fits, instead of sending you shopping.",
  },
  {
    icon: Leaf,
    title: "Diet & Intolerance Aware",
    description:
      "Say what you cannot eat and it filters around it — but always check labels yourself.",
  },
  {
    icon: Camera,
    title: "Snap Your Ingredients",
    description:
      "Paste or attach a photo of what is in the fridge instead of typing the whole list out.",
  },
];

export function AboutProduct() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3">
        <div className="col-span-1 rounded-xl lg:mb-0 mb-12">
          <Image
            width={768}
            height={500}
            src="/image/food.jpg"
            className="max-h-[500px] size-full object-cover scale-110"
            alt="CulinAIze AI cooking assistant"
          />
        </div>
        <div className="col-span-2 lg:pl-24">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            AI Cooking Assistant
          </Typography>
          <Typography
            variant="lead"
            className="mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0  "
          >
            CulinAIze reads what you have got and finds you something to make with it. Ask in plain
            language — or send a photo — and it comes back with a recipe from a real recipe database,
            the steps to cook it, and answers to whatever you ask next.
          </Typography>

          <div className="col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3 ">
            {FEATURES.map(({ icon, title, description }) => (
              <FeatureCard key={title} icon={icon} title={title}>
                {description}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProduct;
