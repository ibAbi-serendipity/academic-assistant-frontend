import { apiFetch } from "./api";

export async function login(
  username,
  password
) {
  return apiFetch(
    "/login/",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
}

export async function register(
  payload
) {
  return apiFetch(
    "/register/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}