import { UpdateUserProps } from "@/app/dashboard/employee/_components/table-user";
import { baseApi } from "../base-api";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return baseApi({
    path: `/api/v1/user/login`,
    config: {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
    },
  });
};
const getUser = async () => {
  return baseApi({
    path: `/api/v1/user/get-users`,
    config: {
      method: "GET",
    },
    requiresAuth: true,
  });
};

const createUser = async ({
  username,
  password,
  role,
}: {
  username: string;
  password: string;
  role: string;
}) => {
  return baseApi({
    path: `/api/v1/user/create-user`,
    config: {
      method: "POST",
      body: JSON.stringify({ username, password, role }),
    },
    requiresAuth: true,
  });
};

const updateUser = async ({
  id,
  userData,
}: {
  id: string;
  userData: UpdateUserProps;
}) => {
  return baseApi({
    path: `/api/v1/user/update-user/${id}`,
    config: {
      method: "PUT",
      body: JSON.stringify(userData),
    },
    requiresAuth: true,
  });
};

const checkToken = async () => {
  return baseApi({
    path: "/api/v1/token/check",
    config: {
      method: "GET",
    },
    requiresAuth: true,
  });
};

export { login, getUser, createUser, updateUser, checkToken };
