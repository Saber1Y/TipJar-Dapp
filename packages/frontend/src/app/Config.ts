// src/lib/wagmi-config.ts or src/config/wagmi.ts
"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const localhost = defineChain({
    id: 31337,
    name: "Anvil",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    rpcUrls: {
        default: { http: ["http://127.0.0.1:8545"] },
    },
});

export const config = getDefaultConfig({
    appName: "TipJar",
    projectId: "ce44c61f10f8ba15bb591d742f02593a",
    chains: [mainnet, sepolia, localhost],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [localhost.id]: http("http://127.0.0.1:8545"),
    },
});
