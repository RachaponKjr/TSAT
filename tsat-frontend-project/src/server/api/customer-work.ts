import { baseApi } from "../base-api";

const getCustomerWork = async () => {
  return baseApi({
    path: `/api/v1/customer-work/get-works`,
    config: { method: "GET" },
  });
};

export { getCustomerWork };
