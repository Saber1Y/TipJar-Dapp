// components/Features.tsx
import React from "react";
import ClipPath from "../../../public/ClipPath";
import {GradientLight} from "../layout/GradientLight";

interface FeatureCardProps {
  title: string;
  description: string;
  accentColor: string;
  backgroundUrl: string;
  iconUrl: string;
  imageUrl?: string;
  light?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  accentColor,
  backgroundUrl,
  iconUrl,
  imageUrl,
  light,
}) => (
  <div
    className="relative p-0.5  md:max-w-[24rem]"
  >
    <div className="relative z-2 flex flex-col min-h-[22rem] text-white p-10 pointer-events-none rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-white  mb-4">{title}</h3>
      <p className="leading-relaxed text-white mb-6">{description}</p>
      <div className="flex items-center mt-auto">
        <img src={iconUrl} width={48} height={48} alt={title} />
      </div>
    </div>

    {light && <GradientLight />}

    <div
      className="absolute inset-0.5 bg-n-8"
      style={{ clipPath: "url(#benefits)" }}
    >
      <div className="absolute ">
        {imageUrl && (
          <img
            src={imageUrl}
            width={380}
            height={362}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>

    <ClipPath />
  </div>
);

export const Features: React.FC = () => {
  const features = [
    {
      title: "Zero Setup Fees",
      description:
        "Launch your TipJar completely free. We only charge a small 2% fee when you receive tips.",
      accentColor: "bg-purple-600",
      backgroundUrl: "/assets/bg/feature1.svg",
      iconUrl: "/icon-1.svg",
      imageUrl: "/card-1.svg",
      light: true,
    },
    {
      title: "Instant Withdrawals",
      description:
        "Access your funds immediately with direct blockchain transfers to your wallet.",
      accentColor: "bg-indigo-600",
      backgroundUrl: "/assets/bg/feature2.svg",
      iconUrl: "/icon-2.svg",
      imageUrl: "/card-2.svg",
      light: false,
    },
    {
      title: "Custom Branding",
      description:
        "Personalize colors, messages, and layout to match your unique style.",
      accentColor: "bg-pink-600",
      backgroundUrl: "/assets/bg/feature3.svg",
      iconUrl: "/icon-4.svg",
      imageUrl: "/card-3.svg",
      light: true,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-24" id="features">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative z-2">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};
