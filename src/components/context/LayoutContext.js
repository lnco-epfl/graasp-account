import React, { useState } from "react";
import PropTypes from "prop-types";

const LayoutContext = React.createContext();

const LayoutContextProvider = ({ children }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        isMainMenuOpen,
        setIsMainMenuOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutContextProvider.propTypes = {
  children: PropTypes.node,
};

LayoutContextProvider.defaultProps = {
  children: null,
};

export { LayoutContext, LayoutContextProvider };
