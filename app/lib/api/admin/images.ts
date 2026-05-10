const API_URL = process.env.API_URL ?? "http://localhost:3000";

// type UploadImagesResponse = {
//   message: string;
//   data: {
//     id: number;
//     path: string;
//     createdAt: string;
//   }[];
// };

type ImageUploadResponse = {
  message: string;
  data: {
    id: number;
    path: string;
    createdAt: string;
  }[];
};

export async function uploadImages(
  accessToken: string,
  files: FileList | File[],
): Promise<number[]> {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_URL}/upload/images?folder=products`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.message ?? "Failed to upload images");
  }
  const data = await res.json();
  return data.data.map(({ id }: { id: number }) => id); // Assuming the API returns { urls: string[] }
}
