import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "../shared/button";
import { toast } from "react-toastify";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Contract from "@/artifacts/contract.json";
import { useWriteContract } from "wagmi";
import { usePublicClient } from "wagmi";

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
  // isCreating,
}) => {
  const publicClient = usePublicClient();
  const [isCreating, setIsCreating] = useState(false);
  const [txStatus, setTxStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const abi = TipjarFactory.abi;
  const ContractAddress = Contract.address as `0x${string}`;

  const { writeContractAsync: createTipJar } = useWriteContract();

  if (!previewData) return null;

  const handleCreateTipjar = async () => {
    if (!cid || !previewData || !address) return;

    setIsCreating(true);
    setTxStatus("pending");

    try {
      const tx = await createTipJar({
        address: ContractAddress,
        abi: TipjarFactory.abi,
        functionName: "createTipJar",
        args: [cid, previewData.slug],
      });

      if (!publicClient) {
        console.error("Public client is undefined");
        setIsCreating(false);
        setTxStatus("error");
        return;
      }

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx,
        confirmations: 1, // Wait for 1 confirmation
        // timeout: 60_000, // 60 seconds timeout
      });

      console.log("Transaction submitted:", tx);
      if (receipt.status === "success") {
        setTxStatus("success");
        toast.success("TipJar created successfully!");

        // Redirect to slug page
        window.location.href = `/tipjar/${previewData.slug}`;
      } else {
        setTxStatus("error");
        toast.error("Transaction failed");
      }
    } catch (error: any) {
      setTxStatus("error");
      console.error("Error creating tip jar:", error);

      if (error.message.includes("SlugAlreadyExists")) {
        toast.error("This URL is already taken");
      } else {
        toast.error(`Creation failed: ${error.shortMessage || error.message}`);
      }
    } finally {
      setIsCreating(false);
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
              {txStatus === "pending" ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2"></div>
                  <p className="text-sm text-gray-500">
                    Confirming transaction...
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleCreateTipjar}
                  disabled={isCreating}
                  fullWidth
                >
                  {isCreating ? "Creating..." : "Create TipJar On-Chain"}
                </Button>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
