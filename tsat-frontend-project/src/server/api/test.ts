import { baseApi } from "../base-api";

const testApi = async () => {
  return baseApi({
    path: "/",
    config: {
      method: "GET",
    },
  });
};

export { testApi };
