"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import { Salad, Utensils, Camera, Leaf, Timer, Replace } from "lucide-react";

import BackgroundCard from "@/components/background-card";

interface OptionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function Option({ icon: Icon, title, children }: OptionProps) {
  return (
    <div className="flex gap-4">
      <div className="mb-4">
        <Icon className="text-gray-900 size-6" />
      </div>
      <div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="mb-2 md:w-10/12 font-normal !text-gray-500">
          {children}
        </Typography>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">
      <Typography variant="h2" className="text-center mb-2" color="blue-gray">
        Why choose CulinAIze?
      </Typography>
      <Typography
        variant="lead"
        className="mb-16 w-full text-center font-normal !text-gray-500 lg:w-10/12"
      >
        Every answer starts from a real recipe database rather than being invented on the spot,
        and every one of them starts from what is already in your kitchen.
      </Typography>
      <div className="mt-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <BackgroundCard title="Grounded in Real Recipes">
            Your question goes to a workflow that pulls candidate recipes from Spoonacular before
            Gemini writes anything, so you get cooking, not confident guesswork.
          </BackgroundCard>
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={Salad} title="Cook From What You Have">
                List what is in the fridge and get something you can make with it, instead of a
                recipe that sends you back to the shop.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={Leaf} title="Diet &amp; Intolerance Filtering">
                Say what you cannot eat and it works around it. Always check the labels yourself
                before you cook.
              </Option>
            </div>
            <Option icon={Timer} title="Fits Your Time">
              Tell it you have got twenty minutes and it will not hand you a three-hour braise.
            </Option>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={Camera} title="Snap Your Ingredients">
                Paste or attach a photo of what you have instead of typing the whole list out.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={Utensils} title="Step-by-Step Instructions">
                Not just an ingredient list — the actual method, in order, so you can cook straight
                from the screen.
              </Option>
            </div>
            <Option icon={Replace} title="Ask Follow-Up Questions">
              Out of buttermilk? Not sure what &quot;fold&quot; means? Ask, and it answers in the
              same conversation.
            </Option>
          </div>
          <BackgroundCard title="Free, and Open Source">
            No subscription, no card, and nothing to install. The whole thing is on GitHub if you
            want to see how it works or fix something.
          </BackgroundCard>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
