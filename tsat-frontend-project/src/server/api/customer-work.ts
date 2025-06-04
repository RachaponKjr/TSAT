import { ApiResponse, baseApi } from "../base-api";

export interface ResBlog {
  id: string;
  title: string;
  service: string;
  subService: string;
  content: any;
  images: string;
  carModel: string;
  carSubModel: string;
  tags: string[];
}

const getCustomerWork = async ():Promise<ApiResponse<ResBlog>> => {
  return baseApi({
    path: `/api/v1/customer-work/get-works`,
    config: { method: "GET" },
  });
};

const deleteCustomerWork = async ({ id }: { id: string }) => {
  return baseApi({
    path: `/api/v1/customer-work/delete-work/${id}`,
    config: { method: "DELETE" },
  });
};

const getBySubCarModel = async (id: string) => {
  return baseApi({
    path: `/api/v1/customer-work/get-by-subCarModel/${id}`,
    config: { method: "GET" },
  });
};

const getWorkByBlog = async (id: string): Promise<ApiResponse<ResBlog[]>> => {
  return baseApi({
    path: `/api/v1/customer-work/get-work/${id}`,
    config: { method: "GET" },
  });
};

export { getCustomerWork, deleteCustomerWork, getBySubCarModel, getWorkByBlog };
