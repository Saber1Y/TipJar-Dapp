"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../utils/rainbow";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
