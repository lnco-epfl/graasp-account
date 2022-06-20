import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MUTATION_KEYS } from "@graasp/query-client";
import { useTranslation } from "react-i18next";
import Main from "./Main";
import { hooks, useMutation } from "../../config/queryClient";
import CardList from "../common/CardList";

const { useCurrentCustomer } = hooks;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6),
  },
  cardListContainer: {
    alignItems: "center",
  },
}));

const PaymentOptions = () => {
  const classes = useStyles();
  const { t } = useTranslation();


  const { data: customer } = useCurrentCustomer();

  const { mutate: setDefaultCard } = useMutation(
    MUTATION_KEYS.SET_DEFAULT_CARD
  );

  const handleCardSelection = (card) => () => {
    setDefaultCard({ cardId: card.id });
  };

  return (
    <Main>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.container}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {t("Payment Options")}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {t("Add new cards & Choose your default payment option")}
        </Typography>
      </Container>
      <Container className={classes.cardListContainer}>
        <Typography variant="h5">{t("My Cards:")}</Typography>
        <CardList selected={customer?.get("defaultCard")} handleCardSelection={handleCardSelection}/>

        {t(
          "All payments are securely processed by Stripe. View Stripe's terms and privacy policies."
        )}
      </Container>
    </Main>
  );
};

export default PaymentOptions;
