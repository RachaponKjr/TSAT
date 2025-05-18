import { Content } from "@/app/dashboard/edit-profile/page";
import { ApiResponse, baseApi } from "../base-api";
import { ContactProps } from "@/components/navbar";

const getContact = async () => {
  return baseApi({
    path: "/api/v1/contact/get-contact",
    config: {
      method: "GET",
    },
  });
};

const updateContact = async ({
  data,
  id,
}: {
  data: Content;
  id: string;
}): Promise<ApiResponse<ContactProps>> => {
  return baseApi({
    path: `/api/v1/contact/update-contact/${id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(data),
    },
  });
};

export { getContact, updateContact };
