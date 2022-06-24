import React, { useContext } from "react";
import { useParams } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  CardContent,
  CardHeader
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Main from "./Main";
import { hooks } from "../../config/queryClient";
import { CheckoutModalContext } from "../context/CheckoutModalContext";
import CardList from "../common/CardList";

const { useCurrentCustomer, usePlans } = hooks;

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
  const { data: plans = [] } = usePlans();
  const { id } = useParams();

  const [selectedCardId, setSelectedCardId] = React.useState(
    customer?.get("defaultCard") ?? null
  );

  if (!selectedCardId && customer && customer.get("defaultCard")) {
    setSelectedCardId(customer.get("defaultCard"));
  }

  const { openModal: openCheckoutModal } = useContext(CheckoutModalContext);


  if(plans.length === 0){
    return <></>
  }

  const currentPlan = plans.filter((plan) => plan.id === id).get(0);

  const subscribe = (plan) => () => openCheckoutModal({ id: currentPlan, name: plan.name });

  const handleCardSelection = (card) => () => {
    setSelectedCardId(card.id);
  };

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
        <Grid item xs={6}>
          {plans
            .filter((plan) => plan.id === id)
            .map((plan) => (
              <>
                <CardHeader
                  title={plan.name}
                  subheader={plan.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {Intl.NumberFormat(window.navigator.language, {
                        style: "currency",
                        currency: plan.prices[0].currency,
                      }).format(plan.prices[0].price)}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" align="center">
                    {plan.description}
                  </Typography>
                </CardContent>
              </>
            ))}
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

          <CardList selected={selectedCardId} handleCardSelection={handleCardSelection}/>
        </Grid>
      </Grid>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={!selectedCardId}
        onClick={subscribe(currentPlan)}
      >
        {t("Subscribe")}
      </Button>

      <Typography align="center" color="textPrimary" gutterBottom>
        {t(
          "All payments are securely processed by Stripe. View Stripe's terms and privacy policies."
        )}
      </Typography>
    </Main>
  );
};

export default PayementConfirmation;
