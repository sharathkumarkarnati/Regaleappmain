export const loadConfig = () => {
  const serverURI = import.meta.env.VITE_SERVER_URI;
  const appURI = import.meta.env.VITE_APP_URI;

  if (!serverURI || !appURI) {
    throw new Error("Missing environment variables");
  }

  return { serverURI, appURI };
};
