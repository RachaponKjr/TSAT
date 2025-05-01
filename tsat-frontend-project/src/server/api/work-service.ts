import { baseApi } from "../base-api";

const getService = async () => {
  return baseApi({
    path: "/api/v1/work-service/get-services",
    config: {
      method: "GET",
    },
  });
};

export { getService };
