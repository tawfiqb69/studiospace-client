// Private API call helper (browser theke).
// Shob-shomoy relative URL dite hobe (jemon "/api/studios"),
// jate Next.js rewrite HTTPOnly cookie Express-e pathay.
export async function privateFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  // Login nai ba session shesh: login page-e pathai, login-er por ei page-e fire ashe
  if (response.status === 401) {
    window.location.href = `/login?redirect=${window.location.pathname}`;
  }

  return { ok: response.ok, status: response.status, data };
}