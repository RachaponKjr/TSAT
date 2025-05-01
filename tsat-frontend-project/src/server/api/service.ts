import { baseApi } from "../base-api";

const getService = async () => {
  return baseApi({
    path: "/api/v1/service/get-service",
    config: {
      method: "GET",
    },
  });
};

export { getService };
