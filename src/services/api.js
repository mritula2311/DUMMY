const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();

function buildUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("Missing VITE_API_BASE_URL in .env");
  }

  return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function handleJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && payload.message
        ? payload.message
        : fallbackMessage;
    throw new Error(message);
  }

  return payload;
}

export async function fetchToken({ studentId, password }) {
  const response = await fetch(buildUrl("/public/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ studentId, password })
  });

  return handleJsonResponse(response, "Unable to fetch token");
}

export async function fetchPrivateData(token) {
  const response = await fetch(buildUrl("/private/data"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleJsonResponse(response, "Unable to fetch private data");
}