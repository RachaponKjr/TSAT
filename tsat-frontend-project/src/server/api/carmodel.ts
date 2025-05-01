import { baseApi } from "../base-api";

const getCarModel = async () => {
  return baseApi({
    path: `/api/v1/car-model/`,
    config: { method: "GET" },
  });
};

export { getCarModel };
