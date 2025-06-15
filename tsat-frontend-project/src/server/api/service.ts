import { ServiceResponse } from "@/app/dashboard/edit-service/_components/table-service";
import { ApiResponse, baseApi } from "../base-api";
import { SubService } from "@/app/dashboard/edit-service/_components/add-sub-service";

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

const updateService = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}): Promise<ApiResponse<ServiceResponse>> => {
  return baseApi({
    path: `/api/v1/service/update-service/${id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};

const saveSubService = async (subData: SubService) => {
  return baseApi({
    path: "/api/v1/service/create-sub-service",
    config: {
      method: "POST",
      body: JSON.stringify(subData),
    },
    requiresAuth: true,
  });
};

const getSubService = async (serviceId: string) => {
  return baseApi({
    path: `/api/v1/service/get-subservice/${serviceId}`,
    config: {
      method: "GET",
    },
    requiresAuth: true,
  });
};

const getSubServices = async () => {
  return baseApi({
    path: "/api/v1/service/get-subservices",
    config: {
      method: "GET",
    },
    requiresAuth: true,
  });
};

const delSubService = async (id: string) => {
  return baseApi({
    path: "/api/v1/service/del-sub-service",
    config: {
      method: "DELETE",
      body: JSON.stringify(id),
    },
  });
};

export {
  getService,
  updateService,
  delSubService,
  saveSubService,
  getSubService,
  getSubServices
};
