import { CMSCustomerProps } from "@/app/dashboard/cms/_components/customer-page";
import { CMSHomeProps } from "@/app/dashboard/cms/_components/home-page";
import { CMSProductProps } from "@/app/dashboard/cms/_components/product-page";
import { CMSServiceProps } from "@/app/dashboard/cms/_components/service-page";
import { baseApi } from "@/server/base-api";

const getCMSHome = async () => {
  return baseApi({
    path: "/api/v1/cms/get-home",
    config: {
      method: "GET",
    },
  });
};
const getCMSService = async () => {
  return baseApi({
    path: "/api/v1/cms/get-service",
    config: {
      method: "GET",
    },
  });
};
const getCMSProduct = async () => {
  return baseApi({
    path: "/api/v1/cms/get-product",
    config: {
      method: "GET",
    },
  });
};
const getCMSCustomer = async () => {
  return baseApi({
    path: "/api/v1/cms/get-customer",
    config: {
      method: "GET",
    },
  });
};
const getCMSAbout = async () => {
  return baseApi({
    path: "/api/v1/cms/get-about",
    config: {
      method: "GET",
    },
  });
};
const getCMSContact = async () => {
  return baseApi({
    path: "/api/v1/cms/get-contact",
    config: {
      method: "GET",
    },
  });
};

const updateCMSHome = async (data: Partial<CMSHomeProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-home/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};
const updateCMSService = async (data: Partial<CMSServiceProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-service/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};
const updateCMSProduct = async (data: Partial<CMSProductProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-product/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};
const updateCMSCustomer = async (data: Partial<CMSCustomerProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-customer/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};
const updateCMSAbout = async (data: Partial<CMSCustomerProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-about/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};
const updateCMSContact = async (data: Partial<CMSCustomerProps>) => {
  return baseApi({
    path: `/api/v1/cms/update-contact/${data.id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
    requiresAuth: true,
  });
};

export {
  getCMSHome,
  updateCMSHome,
  getCMSService,
  updateCMSService,
  getCMSProduct,
  updateCMSProduct,
  getCMSCustomer,
  updateCMSCustomer,
  getCMSAbout,
  updateCMSAbout,
  getCMSContact,
  updateCMSContact,
};
