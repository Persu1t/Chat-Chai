"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const gurus = [
  {
    name: "Hitesh Choudhary",
    role: "Tech trends expert & innovative educator enterpreneur",
    tags: ["GenAI", "React", "Next.js", "Enterprenurship"],
    img: "https://github.com/hiteshchoudhary.png",
    rating: 4.9,
    messages: 1,
    tagColor: "badge-primary",
    link: "/persona-hitesh",
  },
  {
    name: "Piyush Garg",
    role: " Coding mentor & YouTube educator",
    tags: ["System Design", "React", "Node.js", "Docker"],
    img: "https://github.com/piyushgarg-dev.png",
    rating: 4.9,
    messages: 1,
    tagColor: "badge-success",
    link: "/persona-piyush",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#df3658] mb-4">
        Chat-Chai - Your AI Gurus
      </h1>
      <p className="text-center text-gray-600 max-w-xl mb-10">
        Persona AI is a platform that connects you with AI personas of top tech educators. Get personalized advice, coding tips, and career guidance from experts like Hitesh Choudhary and Piyush Garg. Start your journey to becoming a better developer today!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {gurus.map((guru, index) => (
          <div
            key={index}
            className="card w-80 bg-base-100 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <figure className="px-10 pt-10">
              <Image
                src={guru.img}
                alt={guru.name}
                className="rounded-xl"
                height={30}
                width={30}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{guru.name}</h2>
              <p>{guru.role}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {guru.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`badge ${guru.tagColor} badge-outline`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* New Button */}
              <div className="card-actions mt-4">
                <Link href={guru.link} className="btn btn-primary">
                  Chat Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
