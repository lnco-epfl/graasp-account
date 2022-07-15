import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { MUTATION_KEYS } from "@graasp/query-client";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useMutation } from "../../config/queryClient";
import { SUBSCRIPTIONS_PATH } from "../../config/paths";

const CheckoutModal = ({ cardId, priceId, planName }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  const { mutate: changePlan } = useMutation(MUTATION_KEYS.CHANGE_PLAN);

  const onOpen = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    changePlan({ planId: priceId, cardId });
    setOpen(false);
    history.push(SUBSCRIPTIONS_PATH);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{`${t(
          "Checkout - Subscribing to"
        )} ${planName}`}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("Please confirm that you wish to subscribe to this plan.")}
          </Typography>
          <Typography>{t("You will be charged upon confirmation.")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={onConfirm} color="primary">
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={!priceId}
        onClick={onOpen}
      >
        {t("Subscribe")}
      </Button>
    </>
  );
};

CheckoutModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  priceId: PropTypes.string.isRequired,
  planName: PropTypes.string.isRequired,
};

CheckoutModal.defaultProps = {};

export default CheckoutModal;
