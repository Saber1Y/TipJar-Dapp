// app/tipjar/[slug]/page.tsx
import TipJarPage from "@/components/tipjar";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Tipjar from "@/artifacts/Tipjar.json";
import ContractInfo from "@/artifacts/contract.json";

type TipJarRouteProps = {
  params: {
    slug: string;
  };
};

// ✅ Fix: await props before accessing params
// export async function generateMetadata(props: Promise<TipJarRouteProps>) {
//   const { params } = await props;
//   const slug = params.slug;
//   return {
//     title: `Tip Jar for ${slug}`,
//     description: `Support ${slug} by tipping them via crypto.`,
//   };
// }

export default function TipJarRoute({ params }: TipJarRouteProps) {
  const abi = TipjarFactory.abi;
  const tipabi = Tipjar.abi;
  const ContractAddress = ContractInfo.address;

  return (
    <TipJarPage
      FactoryAbi={abi}
      FactoryAddress={ContractAddress as `0x${string}`}
      TipJarAbi={tipabi}
      // slug={params.slug}
    />
  );
}
