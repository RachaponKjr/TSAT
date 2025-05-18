import { Review } from "@/app/dashboard/edit-review/page";
import { ApiResponse, baseApi } from "../base-api";

const getCustomerReview = async (): Promise<ApiResponse<Review>> => {
  return baseApi({
    path: `/api/v1/customer-review/get`,
    config: { method: "GET" },
  });
};


export { getCustomerReview };
