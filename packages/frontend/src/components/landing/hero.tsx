import React from "react";
import curve from "../../../public/curve.png";
import Image from "next/image";

interface HeroProps {
  onCreateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCreateClick }) => {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Turn Your Passion
          <br />
          <span className="inline-block relative">
            Into Passionable Creation{" "}
            <Image
              src={curve}
              className="absolute top-full left-0 w-full xl:-mt-2"
              width={624}
              height={28}
              alt="Curve"
            />
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Empower your craft with a modern TipJar that makes receiving support
          simple, secure, and rewarding for both you and your supporters.
        </p>

        <button
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl shadow-purple-200"
          onClick={onCreateClick}
        >
          <span className="ml-3 opacity-70 group-hover:opacity-100 transition-opacity">
            Create TipJar
          </span>
        </button>

      </div>
    </section>
  );
};
