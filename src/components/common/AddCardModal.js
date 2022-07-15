import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { DATA_KEYS, MUTATION_KEYS } from "@graasp/query-client";
import { useTranslation } from "react-i18next";
import { hooks, queryClient, useMutation } from "../../config/queryClient";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const AddCardModal = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { data: member } = hooks.useCurrentMember();
  const mutation = useMutation(MUTATION_KEYS.CREATE_SETUP_INTENT);

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    mutation.mutate(undefined, {
      onSuccess: async ({ clientSecret }) => {
        const result = await stripe.confirmCardSetup(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: member.name,
            },
          },
        });

        if (result.error) {
          setHasError(true);
        } else {
          queryClient.invalidateQueries(DATA_KEYS.CARDS_KEY);
          setOpen(false);
        }
      },
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t("Add Card")}</DialogTitle>
        <DialogContent>
          <Typography>{t("Enter your card details.")}</Typography>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          {hasError ? (
            <Typography color="error">
              {t("Invalid Card Credentials, Please retry.")}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={onSubmit} color="primary">
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>{t("Add Card")}</ListItemText>
      </ListItem>
    </>
  );
};

export default AddCardModal;
