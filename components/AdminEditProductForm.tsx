"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SectionCard } from "./Cards";
import { ImagesUpload, TextInput } from "./Input";
import {
  createProduct,
  CreateProductPayload,
  GetSingleProduct,
  getSingleProduct,
} from "@/app/lib/api/admin/products";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { getCategories } from "@/app/lib/api/admin/categories";
import { Select } from "antd";
import { uploadImages } from "@/app/lib/api/admin/images";
interface Category {
  value: number;
  label: string; // mapped from CategoryData.data[].category
}

type FormState = "idle" | "loading" | "success" | "error";
type AdminEditProductFormProps = {
  productId: string;
};

export function AdminEditProductForm({ productId }: AdminEditProductFormProps) {
  const [productData, setProductData] = useState<GetSingleProduct | null>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number[] | null>(
    null,
  );
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [images, setImages] = useState<{ file: FileList; url: string }[]>([]);

  // Fetch categories on mount so the dropdown is populated.
  // If you have a getCategories API, replace the placeholder below.
  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = await getLocalStorageItem("accessToken");
        if (!token) return;

        const category = await getCategories(token);
        const product = await getSingleProduct(token, Number(productId));
        const mappedCategory: Category[] = category.data.map((c) => ({
          value: c.id,
          label: c.category,
        }));
        setCategories(mappedCategory);
        setProductData(product);
        // if (mapped.length > 0) setSelectedCategoryId([mapped[0].value]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  function addFiles(newFiles: FileList | File[] | null) {
    if (!newFiles) return;
    // Checks if file is image
    const accepted = Array.from(newFiles).filter((f) =>
      f.type.startsWith("image/"),
    );
    const withUrl = accepted.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => {
      const merged = [...prev, ...withUrl];
      return merged;
    });
  }

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
      const token = await getLocalStorageItem("accessToken");
      if (!token) {
        setErrorMessage("You are not authenticated. Please log in again.");
        setFormState("error");
        return;
      }

      const payload: CreateProductPayload = {
        categoryId: selectedCategoryId,
        name,
        description,
        price,
        quantity,
      };

      const imageIds = await uploadImages(
        token,
        images.map(({ file }) => file),
      );

      await createProduct(token, payload);
      setFormState("success");
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setFormState("error");
    }
  }

  return (
    <SectionCard
      title={"Add Product"}
      description={"Fill out this form to create a new product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          name={"name"}
          label={"Product Name"}
          required
          value={productData?.name}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name={"price"}
            label={"Price"}
            required
            value={productData?.price}
          />
          <TextInput
            name={"quantity"}
            label={"Quantity"}
            required
            value={productData?.quantity}
          />
        </div>
        <div className="w-full">
          <p className="text-sm mb-0.5 text-secondary">Categories</p>
          <Select
            mode="multiple"
            className="w-full"
            options={categories}
            showSearch={{ optionFilterProp: "label" }}
            allowClear
            value={selectedCategoryId}
            onChange={(values) => setSelectedCategoryId(values)}
          />
        </div>
        <TextInput
          name={"description"}
          label={"Description"}
          required
          value={productData?.description}
        />

        {formState === "success" && (
          <p className="text-sm text-green-600 font-medium">
            ✓ Product created successfully!
          </p>
        )}
        {formState === "error" && errorMessage && (
          <p className="text-sm text-red-500 font-medium">✕ {errorMessage}</p>
        )}
        <ImagesUpload onChange={(files) => addFiles(files)} />
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
