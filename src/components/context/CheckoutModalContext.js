import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { MUTATION_KEYS } from "@graasp/query-client";
import { useMutation } from "../../config/queryClient";

const CheckoutModalContext = React.createContext();

const CheckoutModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(null);

  const { mutate: changePlan } = useMutation(MUTATION_KEYS.CHANGE_PLAN);

  const openModal = (newPlan) => {
    setOpen(true);
    setPlan(newPlan);
  };

  const onConfirm = () => {
    changePlan({ planId: plan.id });
    setOpen(false);
    setPlan(null);
  };

  const onClose = () => {
    setOpen(false);
    setPlan(null);
  };

  return (
    <CheckoutModalContext.Provider value={{ openModal }}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Checkout - Subscribing to {plan?.name}</DialogTitle>
        <DialogContent>
          <Typography>
            Please confirm that you wish to subscribe to this plan.
          </Typography>
          <Typography>You will be charged upon confirmation.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </CheckoutModalContext.Provider>
  );
};

CheckoutModalProvider.propTypes = {
  children: PropTypes.node,
};

CheckoutModalProvider.defaultProps = {
  children: null,
};

export { CheckoutModalProvider, CheckoutModalContext };
