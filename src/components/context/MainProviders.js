import React from "react";
import PropTypes from "prop-types";
import { LayoutContextProvider } from "./LayoutContext";
import { CheckoutModalProvider } from "./CheckoutModalContext";
import { AddCardModalProvider } from "./AddCardModalContext";

const ModalProviders = ({ children }) => (
  <LayoutContextProvider>
    <CheckoutModalProvider>
      <AddCardModalProvider>{children}</AddCardModalProvider>
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
