// app/page.tsx or app/home/page.tsx
"use client";

import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Contract from "@/artifacts/contract.json";
import LandingPage from "@/components/landing";

export default function Home() {
  const abi = TipjarFactory.abi;
  const ContractAddress = Contract.address as `0x${string}`;

  return <LandingPage ContractAddress={ContractAddress} abi={abi} />;
}
