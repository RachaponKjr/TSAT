"use server";
import { getCookie } from "@/lib/cookie";

const BASE_URL: string = "http://localhost:3131";
// const BASE_URL: string = "http://tsat-back:3131";
type FetchConfig = RequestInit & { headers?: Record<string, string> };

export type ApiResponse<T> = {
  data?: T;
  message?: string;
  status: number;
};

async function baseApi<T>({
  path,
  params = {},
  config = {},
  requiresAuth = false,
  baseUrl = BASE_URL,
}: {
  path: string;
  params?: Record<string, unknown>;
  config?: FetchConfig;
  requiresAuth?: boolean;
  baseUrl?: string;
}): Promise<ApiResponse<T>> {
  try {
    const token = await getCookie("access_token");

    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    const fullUrl = `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...((config.headers as Record<string, string>) || {}),
    };

    if (requiresAuth && token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      ...config,
      headers: requestHeaders,
    });

    if (!response.ok) {
      return { message: response.statusText, status: response.status };
    }

    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { baseApi };
