// app/tipjar/[slug]/page.tsx
import TipJarPage from "@/components/tipjar";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Tipjar from "@/artifacts/Tipjar.json";
import ContractInfo from "@/artifacts/contract.json";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

export default async function TipJarRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const abi = TipjarFactory.abi;
  const tipabi = Tipjar.abi;
  const ContractAddress = ContractInfo.address;

  const metadataCID = await storage.resolveScheme({
    client: storage,
    uri: `ipfs://${await readContract({
      address: ContractAddress,
      abi: abi,
      functionName: "getCIDBySlug",
      args: [slug],
    })}`,
  });

  // fetch metadata JSON at build/render time
  const res = await fetch(
    `https://ipfs.thirdwebstorage.com/ipfs/${metadataCID}`,
  );
  const metadata = await res.json();

  return (
    <TipJarPage
      FactoryAbi={abi}
      FactoryAddress={ContractAddress as `0x${string}`}
      TipJarAbi={tipabi}
      slug={slug}
      metadata={metadata}
    />
  );
}
function readContract(arg0: { address: string; abi: ({ type: string; name: string; inputs: { name: string; type: string; internalType: string; }[]; outputs: { name: string; type: string; internalType: string; }[]; stateMutability: string; anonymous?: undefined; } | { type: string; name: string; inputs: { name: string; type: string; indexed: boolean; internalType: string; }[]; anonymous: boolean; outputs?: undefined; stateMutability?: undefined; } | { type: string; name: string; inputs: { name: string; type: string; internalType: string; }[]; outputs?: undefined; stateMutability?: undefined; anonymous?: undefined; })[]; functionName: string; args: string[]; }) {
  throw new Error("Function not implemented.");
}

