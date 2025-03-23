import { getAuthManager } from "./authManager";

export const AJAX = async function (url, uploadData = undefined) {
  const response = await fetch(url, {
    method: uploadData ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthManager().token}`,
    },
    ...(uploadData ? { body: JSON.stringify(uploadData) } : {}),
  });

  if (response.status === 401 || response.status === 403) {
    return getAuthManager().logout();
  } else if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
