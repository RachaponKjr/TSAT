import { baseApi } from "../base-api";

const getCustomerReview = async () => {
  return baseApi({
    path: `/api/v1/customer-review/get`,
    config: { method: "GET" },
  });
};

export { getCustomerReview };
