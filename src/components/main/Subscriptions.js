import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FormControl, Select } from "@material-ui/core";
import { List } from "immutable";
import Main from "./Main";
import { formatCurrency } from "../../utils/currency";
import { hooks } from "../../config/queryClient";
import { PAYMENT_CONFIRM_PATH } from "../../config/paths";
import { DEFAULT_CURRENCY } from "../../config/constants";

const { usePlans, useOwnPlan } = hooks;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
}));

const Subscriptions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { data: plans = List() } = usePlans();

  const { data: currentPlan } = useOwnPlan();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const currencies =
    plans?.get(0)?.prices?.map((price) => price.currency) ?? [];

  const isSubscribed = (plan) => plan.id === currentPlan?.get("id");

  const getSubscribeButtonText = (plan) => {
    if (isSubscribed(plan)) {
      return t("Subscribed");
    }
    if (plan.level < currentPlan?.get("level")) {
      return t("Downgrade");
    }
    return t("Upgrade");
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
          {t("Subscriptions")}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {t("Choose the plan most suitable for your needs")}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <FormControl fullWidth>
            <Select native value={currency} onChange={handleChange}>
              {currencies.map((curr) => (
                <option value={curr}>{curr}</option>
              ))}
            </Select>
          </FormControl>

          {plans.sort().map((plan) => (
            <Grid item key={plan.title} sm={12} md={6} lg={4}>
              <Card>
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
                      {formatCurrency(
                        plan.prices.find(
                          ({ currency: curr }) => curr === currency
                        )
                      )}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {t("/mo")}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" align="center">
                    {plan.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubscribed(plan)}
                    to={`${PAYMENT_CONFIRM_PATH}/${plan.id}`}
                  >
                    {getSubscribeButtonText(plan)}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Main>
  );
};

export default Subscriptions;
