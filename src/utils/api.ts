const BASE_URL = "https://vitazan.webtechnomind.in/api";

export interface ApiEnvelope<T = unknown> {
  status: boolean;
  status_type?: number;
  message?: string;
  response_data?: T;
  Status_Array?: Record<string, string>;
  data?: T;
  user?: T;
  token?: string;
  role?: string;
}

interface ApiOptions {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: Record<string, unknown> | FormData;
  auth?: boolean;
  params?: Record<string, string>;
}

/** Extract list/object payload from admin API envelope variants. */
export function getResponseData<T>(response: ApiEnvelope<T>): T | undefined {
  if (response.response_data !== undefined) return response.response_data;
  if (response.data !== undefined) return response.data;
  return undefined;
}

export async function api<T = ApiEnvelope>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, auth = false, params } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const isFormData = body instanceof FormData;
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  const data = await res.json();

  if (!res.ok || data.status === false) {
    const errors = data.errors as Record<string, string[]> | undefined;
    const errorMessage =
      data.message ||
      (errors ? Object.values(errors).flat().join(", ") : undefined) ||
      "Something went wrong";
    throw new ApiError(errorMessage, res.status, data);
  }

  return data as T;
}

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(message: string, status: number, data: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vitazan_token");
}

export function setToken(token: string): void {
  localStorage.setItem("vitazan_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("vitazan_token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
