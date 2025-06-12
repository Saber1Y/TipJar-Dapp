"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import axios from "axios";

import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Tipjar from "@/artifacts/Tipjar.json";
import Contract from "@/artifacts/contract.json";

interface TipJarPageProps {
  FactoryAddress: `0x${string}`;
  FactoryAbi: any;
  TipJarAbi: any;
  slug: string;
  metadata: TipJarMetadata | null;
}

interface TipJarMetadata {
  name: string;
  description: string;
  avatarUrl: string;
  slug: string;
  owner: string;
  createdAt: string;
}

const TipJarPage: React.FC<TipJarPageProps> = ({ slug, metadata: initialMetadata }) => {
  const [tipJarAddress, setTipJarAddress] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<TipJarMetadata | null>(initialMetadata);

  const FactoryAbi = TipjarFactory.abi;
  const FactoryAddress = Contract.address as `ox${string}`;

  const { data: contractTipJarAddress } = useReadContract({
    address: FactoryAddress,
    abi: FactoryAbi,
    functionName: "getTipJarBySlug",
    args: [slug as string],
    query: {
      enabled: !!slug,
    },
  });

  const { data: metadataCID } = useReadContract({
    address: FactoryAddress,
    abi: FactoryAbi,
    functionName: "getCIDBySlug",
    args: [slug as string],
    query: {
      enabled: !!slug,
    },
  });

  console.log("Slug:", slug);
  console.log("contractTipJarAddress:", FactoryAddress);
  console.log("metadataCID:", metadataCID);

  useEffect(() => {
    if (
      contractTipJarAddress &&
      contractTipJarAddress !== "0x0000000000000000000000000000000000000000"
    ) {
      setTipJarAddress(contractTipJarAddress as string);
    }
  }, [contractTipJarAddress]);

  // useEffect(() => {
  //   async function fetchMeta() {
  //     if (!metadataCID) return;
  //     try {
  //       const res = await fetch(
  //         `https://ipfs.thirdwebstorage.com/ipfs/${metadataCID}`,
  //       );
  //       if (!res.ok) {
  //         console.error("IPFS fetch failed:", res.status, res.statusText);
  //         return;
  //       }
  //       const data = await res.json();
  //       setMetadata(data);
  //       console.log("✅ Metadata:", data);
  //     } catch (err) {
  //       console.error("Failed to fetch metadata:", err);
  //     }
  //   }
  //   fetchMeta();
  // }, [metadataCID]);

  if (!tipJarAddress || !metadata) {
    return <div className="p-8 text-white">Loading TipJar details...</div>;
  }

  if (!slug) return <div className="p-8 text-white">No slug found in URL.</div>;
  if (!contractTipJarAddress)
    return <div className="p-8 text-white">Tip Jar not found.</div>;

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-lg shadow">
      <img
        src={metadata.avatarUrl}
        alt={metadata.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold">{metadata.name}</h1>
      <p className="text-gray-600 mb-2">{metadata.description}</p>
      <p className="text-sm text-gray-500">Owned by: {metadata.owner}</p>
      <p className="text-sm text-gray-500 mt-2">Contract: {tipJarAddress}</p>
    </div>
  );
};

export default TipJarPage;
