import React from "react";
import PropTypes from "prop-types";
import { LayoutContextProvider } from "./LayoutContext";
import { CheckoutModalProvider } from "./CheckoutModalContext";

const ModalProviders = ({ children }) => (
  <LayoutContextProvider>
    <CheckoutModalProvider>
      {children}
    </CheckoutModalProvider>
  </LayoutContextProvider>
);

ModalProviders.propTypes = {
  children: PropTypes.node,
};

ModalProviders.defaultProps = {
  children: null,
};

export default ModalProviders;
