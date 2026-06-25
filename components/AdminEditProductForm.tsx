"use client";
import { FormEvent, useState } from "react";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import {
  updateProduct,
  CreateProductPayload,
  GetSingleProduct,
} from "@/app/lib/api/admin/products";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { GetProp, Select } from "antd";
import { uploadImages } from "@/app/lib/api/admin/images";
import { Category } from "@/app/lib/api/admin/categories";
import { MerchantProductImageInput, ProductImageItem } from "./MerchantProductImageInput";

type FormState = "idle" | "loading" | "success" | "error";

type AdminEditProductFormProps = {
  productData: GetSingleProduct;
  catagoriesData: Category[];
  accessToken: string;
};

type SelectOptions = GetProp<typeof Select, "options">;

export function AdminEditProductForm({
  productData,
  catagoriesData,
  accessToken,
}: AdminEditProductFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number[] | null>(
    productData.categories.map(({ id }) => id),
  );
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [images, setImages] = useState<ProductImageItem[]>(
    productData.images.map((img) => ({
      id: img.id,
      url: img.path,
    })),
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string).trim();
    const description = (formData.get("description") as string).trim();
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);

    if (!name || !description || isNaN(price) || isNaN(quantity)) {
      setErrorMessage("Please fill in all fields with valid values.");
      setFormState("error");
      return;
    }

    if (!selectedCategoryId) {
      setErrorMessage("Please select a category.");
      setFormState("error");
      return;
    }

    try {
      const payload: CreateProductPayload = {
        categoryId: selectedCategoryId,
        name,
        description,
        price,
        quantity,
      };

      const newFiles = images.map(({ file }) => file).filter((f): f is File => !!f);
      let uploadedImageIds: number[] = [];
      if (newFiles.length > 0) {
        uploadedImageIds = await uploadImages(accessToken, newFiles);
      }

      const existingImageIds = images.map(({ id }) => id).filter((id): id is number => id !== undefined);
      const finalImageIds = [...existingImageIds, ...uploadedImageIds];

      await updateProduct(accessToken, productData.id, payload, finalImageIds);
      setFormState("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setFormState("error");
    }
  }

  const options: SelectOptions = catagoriesData.map(({ id, category }) => ({
    value: id,
    label: category,
  }));

  return (
    <SectionCard
      title={"Edit Product"}
      description={"Fill out this form to edit the product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          name={"name"}
          label={"Product Name"}
          required
          defaultValue={productData?.name}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name={"price"}
            label={"Price"}
            required
            defaultValue={productData?.price}
          />
          <TextInput
            name={"quantity"}
            label={"Quantity"}
            required
            defaultValue={productData?.quantity}
          />
        </div>
        <div className="w-full">
          <p className="text-sm mb-0.5 text-secondary">Categories</p>
          <Select
            mode="multiple"
            className="w-full"
            options={options}
            defaultValue={productData.categories.map(({ id }) => id)}
            showSearch={{ optionFilterProp: "label" }}
            allowClear
            // value={selectedCategoryId}
            onChange={(values) => setSelectedCategoryId(values)}
          />
        </div>
        <TextInput
          name={"description"}
          label={"Description"}
          required
          defaultValue={productData?.description}
        />

        {formState === "success" && (
          <p className="text-sm text-green-600 font-medium">
            ✓ Product updated successfully!
          </p>
        )}
        {formState === "error" && errorMessage && (
          <p className="text-sm text-red-500 font-medium">✕ {errorMessage}</p>
        )}
        <MerchantProductImageInput
          images={images}
          onChange={(updatedImages) => setImages(updatedImages)}
        />
        <button
          type="submit"
          disabled={formState === "loading"}
          className="cursor-pointer bg-[#FACC14] rounded-md p-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {formState === "loading" ? "Submitting…" : "Submit"}
        </button>
      </form>
    </SectionCard>
  );
}
