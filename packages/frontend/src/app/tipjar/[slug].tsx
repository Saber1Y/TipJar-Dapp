// app/tipjar/[slug]/page.tsx
import TipJarPage from "@/components/tip-jar";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Tipjar from "@/artifacts/Tipjar.json";
import ContractInfo from "@/artifacts/contract.json";

type TipJarRouteProps = {
    params: {
        slug: string;
    };
};

export default function TipJarRoute({ params }: { params: { slug: string } }) {
    const abi = TipjarFactory.abi;
    const tipabi = Tipjar.abi;
    const ContractAddress = ContractInfo.address;

    return (
        <TipJarPage
            FactoryAbi={abi}
            FactoryAddress={ContractAddress as `0x${string}`}
            TipJarAbi={tipabi}
        />
    );
}

export async function generateMetadata({ params }: TipJarRouteProps) {
    const { slug } = params;
    return {
        title: `Tip Jar for ${slug}`,
        description: `Support ${slug} by tipping them via crypto.`,
    };
}
