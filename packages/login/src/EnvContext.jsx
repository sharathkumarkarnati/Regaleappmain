import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { loadConfig } from "./services/loadConfig";

const config = loadConfig();

const Context = createContext(config);

export const EnvContext = ({ children }) => (
  <Context.Provider value={config}>{children}</Context.Provider>
);
EnvContext.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEnvConfig = () => useContext(Context);
