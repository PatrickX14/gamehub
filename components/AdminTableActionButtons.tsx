"use client";
import Link from "next/link";
import { Search, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import { deleteProduct } from "@/app/lib/api/admin/products";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { useRouter } from "next/navigation";

interface ViewButtonProps {
  segment: string;
  param: string | number;
}

interface EditButtonProps {
  segment: string;
  param: string | number;
}

interface DeleteButtonProps {
  id: string | number;
}

export const ViewButton: React.FC<ViewButtonProps> = ({ segment, param }) => {
  return (
    <Link href={`/admin/${segment}/${param}`}>
      <button className="flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 p-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
        <Search className="size-2" />
      </button>
    </Link>
  );
};

export const EditButton: React.FC<EditButtonProps> = ({ segment, param }) => {
  return (
    <Link href={`/admin/${segment}/${param}`}>
      <button className="flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 p-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
        <Edit className="size-2 text-gray-200" />
      </button>
    </Link>
  );
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const accessToken = await getLocalStorageItem("accessToken");
    await deleteProduct(accessToken ?? "", id);
    setIsConfirmOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 p-1.5 rounded text-sm font-medium transition-colors cursor-pointer"
      >
        <Delete className="size-2 text-gray-200" />
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
