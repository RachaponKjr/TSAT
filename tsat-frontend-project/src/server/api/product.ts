import { baseApi } from "../base-api";

const getCatagoryProduct = async () => {
  return baseApi({
    path: "/api/v1/product/get-category",
    config: {
      method: "GET",
    },
  });
};

const getProduct = async ({ id }: { id: string }) => {
  return baseApi({
    path: `/api/v1/product/get-category/${id}`,
    config: {
      method: "GET",
    },
  });
};

const getAllProduct = async () => {
  return baseApi({
    path: "/api/v1/product/get-product",
    config: {
      method: "GET",
    },
  });
};

const deleteProduct = async ({ id }: { id: string }) => {
  return baseApi({
    path: `/api/v1/product/delete-product/${id}`,
    config: {
      method: "DELETE",
    },
  });
};

export { getCatagoryProduct, getProduct, getAllProduct, deleteProduct };
