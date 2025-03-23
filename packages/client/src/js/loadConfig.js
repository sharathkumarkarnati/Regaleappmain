export const loadConfig = () => {
  const envs = {
    SERVER_URI: import.meta.env.VITE_SERVER_URI,
    LOGIN_URI: import.meta.env.VITE_LOGIN_URI,
  };

  if (Object.values(envs).some((value) => !value)) {
    throw new Error("Missing environment variable");
  }

  return envs;
};
