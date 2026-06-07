import { apiFetch } from "./api";

export async function sendMessage(
  question
) {
  return apiFetch(
    "/chat/",
    {
      method: "POST",
      body: JSON.stringify({
        question,
      }),
    }
  );
}