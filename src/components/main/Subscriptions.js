import React, { useContext } from "react";
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
import Main from "./Main";
import { hooks } from "../../config/queryClient";
import { CheckoutModalContext } from "../context/CheckoutModalContext";

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
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const Subscriptions = () => {
  const classes = useStyles();

  const { data: plans = [] } = usePlans();

  const { data: currentPlan } = useOwnPlan();

  const { openModal: openCheckoutModal } = useContext(CheckoutModalContext);

  const subscribe = (plan) => () => openCheckoutModal(plan);

  const isSubscribed = (plan) => plan.id === currentPlan?.get("id");

  const getSubscribeButtonText = (plan) => {
    if (isSubscribed(plan)) return "Subscribed";
    if (plan.level < currentPlan?.get("level")) return "Downgrade";
    return "Upgrade";
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
          Subscriptions
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Choose the plan most suitable for your needs
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
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
                      €{plan.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" align="center">
                    {plan.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubscribed(plan)}
                    onClick={subscribe(plan)}
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
