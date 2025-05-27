import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "../shared/button";
import { useRouter } from "next/navigation";

import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Contract from "@/artifacts/contract.json";

import { useWriteContract } from "wagmi";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewData: {
    name: string;
    description: string;
    slug: string;
    avatarUrl: string;
  } | null;
  address: string | undefined;
  cid: string | null;
  onCreateClick: (e: React.FormEvent) => void;
  isCreating: boolean;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  previewData,
  address,
  cid,
  onCreateClick,
  isCreating,
}) => {
  if (!previewData) return null;

  const abi = TipjarFactory.abi;
  const ContractAddress = Contract.address as `0x${string}`;

  const { writeContractAsync: createTipJar } = useWriteContract();
  const router = useRouter();

  const handleCreateTipjar = async () => {
    if (!cid || !previewData || !address) return;

    try {
      const tx = await createTipJar({
        address: ContractAddress,
        abi: TipjarFactory.abi,
        functionName: "createTipJar",
        args: [
          previewData.name,
          previewData.description,
          cid,
          previewData.slug,
        ],
      });

      console.log("Transaction submitted:", tx);
      // maybe show a loading spinner here

      // optional: wait for confirmation
      // await waitForTransaction({ hash: tx.hash });

      // then redirect:
      router.push(`/tipjar/${previewData.slug}`);
    } catch (error) {
      console.error("Error creating tip jar:", error);
      // show error toast or message
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              TipJar Preview
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600"
            >
              <X />
            </button>
          </div>

          <div className="space-y-4">
            <img
              src={previewData.avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h3 className="text-lg font-semibold text-center">
              {previewData.name}
            </h3>
            <p className="text-black text-center">{previewData.description}</p>
            <p className="text-sm text-gray-500">
              <strong>Owner:</strong>{" "}
              {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
            </p>

            <p className="text-sm text-gray-500">
              <strong>TipJar Link:</strong>{" "}
              <span className="text-purple-600">{`/tipjar/${previewData.slug}`}</span>
            </p>

            {cid && (
              <div className="text-xs text-gray-500 break-all">
                <strong>IPFS CID:</strong> {cid}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleCreateTipjar}
                disabled={isCreating || !cid}
                isLoading={isCreating}
                fullWidth
              >
                {isCreating ? "Creating TipJar..." : "Create TipJar On-Chain"}
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
