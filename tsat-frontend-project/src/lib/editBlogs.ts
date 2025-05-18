import { axiosInstance } from "../axios-instance";

const postImage = async ({
  data,
  signal,
  onUploadProgress,
}: {
  data: FormData;
  signal?: AbortSignal;
  onUploadProgress?: (event: ProgressEvent) => void;
}) => {
  return axiosInstance.post("/api/v1/edit-blog/upload-blog-image", data, {
    signal,
    onUploadProgress,
    headers: {
      // ❌ ไม่ต้องใส่ 'Content-Type' เอง ถ้าใช้ FormData
    },
  });
};

export { postImage };
