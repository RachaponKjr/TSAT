import { baseApi } from "../base-api";

const getCatagoryService = async () => {
  return baseApi({
    path: "/api/v1/catagory-service/get",
    config: {
      method: "GET",
    },
  });
};

export { getCatagoryService };
