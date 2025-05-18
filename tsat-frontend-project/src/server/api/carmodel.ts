import { CarCatogory } from "@/types/car-model";
import { ApiResponse, baseApi } from "../base-api";

const getCarModel = async ():Promise<ApiResponse<CarCatogory[]>> => {
  return baseApi({
    path: `/api/v1/car-model/`,
    config: { method: "GET" },
  });
};

const getSubCarModel = async (id: string) => {
  return baseApi({
    path: `/api/v1/car-model/${id}`,
    config: { method: "GET" },
  });
};

export { getCarModel, getSubCarModel };
