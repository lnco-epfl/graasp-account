import React, { useState } from "react";
import { useParams } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  CardContent,
  CardHeader,
  FormControl,
  Select,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Main from "./Main";
import { hooks } from "../../config/queryClient";
import CheckoutModal from "../context/CheckoutModalContext";
import CardList from "../common/CardList";

const { useCurrentCustomer, usePlan } = hooks;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2, 0, 4),
  },
  cardListContainer: {
    alignItems: "center",
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
}));

const PayementConfirmation = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { data: customer } = useCurrentCustomer();

  const { id } = useParams();
  const { data: plan } = usePlan({ planId: id });

  const [currency, setCurrency] = useState(null);

  const handleChange = (event) => {
    setCurrency(
      plan
        ?.get("prices")
        .find(({ currency: curr }) => curr === event.target.value)
    );
  };

  const [selectedCardId, setSelectedCardId] = React.useState(
    customer?.get("defaultCard") ?? null
  );

  if (!selectedCardId && customer && customer.get("defaultCard")) {
    setSelectedCardId(customer.get("defaultCard"));
  }

  if (!plan) {
    return <></>;
  }

  if(!currency){
    setCurrency(plan.get("prices")[0]);
    return <></>;
  }

  const handleCardSelection = (card) => () => setSelectedCardId(card.id);

  return (
    <Main>
      <CssBaseline />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {t("Payment Options")}
      </Typography>

      <Grid container className={classes.container}>
        <FormControl fullWidth>
          <Select
            id="id"
            native
            value={currency.currency}
            onChange={handleChange}
          >
            {plan.get("prices").map(({ currency: curr }) => (
              <option value={curr}>{curr}</option>
            ))}
          </Select>
        </FormControl>

        <Grid item xs={6}>
          <>
            <CardHeader
              title={plan.get("name")}
              subheader={plan.get("subheader")}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{ align: "center" }}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h3" color="textPrimary">
                  {Intl.NumberFormat(window.navigator.language, {
                    style: "currency",
                    currency: currency.currency,
                  }).format(currency.price)}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              <Typography variant="subtitle1" align="center">
                {plan.get("description")}
              </Typography>
            </CardContent>
          </>
        </Grid>
        <Grid item xs={6} className={classes.container}>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            {t("Choose your payment option")}
          </Typography>

          <CardList
            selected={selectedCardId}
            handleCardSelection={handleCardSelection}
          />
        </Grid>
      </Grid>

      <CheckoutModal
        cardId={selectedCardId !== customer?.get("defaultCard") ? selectedCardId : undefined}
        priceId={currency.id}
        planName={plan.get("name")}
      />

      <Typography align="center" color="textPrimary" gutterBottom>
        {t(
          "All payments are securely processed by Stripe. View Stripe's terms and privacy policies."
        )}
      </Typography>
    </Main>
  );
};

export default PayementConfirmation;
