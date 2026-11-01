// Private API call helper (browser theke).
// Shob-shomoy relative URL dite hobe (jemon "/api/studios"),
// jate Next.js rewrite HTTPOnly cookie Express-e pathay.
// Private API call helper (browser theke).
// Shob-shomoy relative URL dite hobe.
export async function privateFetch(url, options = {}, router) {
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

  // Login nai ba session shesh
  if (response.status === 401) {
    router?.replace("/login");
  }

  return { ok: response.ok, status: response.status, data };
}