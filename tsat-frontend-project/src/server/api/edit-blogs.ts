import { baseApi } from "../base-api";

const postImage = async (data: any) => {
  return baseApi({
    path: `/api/v1/edit-blog/upload-blog-image`,
    config: {
      method: "POST",
      body: data,
    },
  });
};

export { postImage };
