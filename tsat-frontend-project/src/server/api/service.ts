import { ServiceResponse } from "@/app/dashboard/edit-service/_components/table-service";
import { ApiResponse, baseApi } from "../base-api";

const getService = async (): Promise<
  ApiResponse<{ service: ServiceResponse[] }>
> => {
  return baseApi({
    path: "/api/v1/service/get-service",
    config: {
      method: "GET",
    },
  });
};


const updateService = async (
  id: string,
  data: Partial<ServiceResponse>
): Promise<ApiResponse<ServiceResponse>> => {
  return baseApi({
    path: `/api/v1/service/update-service/${id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
  });
};

export { getService, updateService };
