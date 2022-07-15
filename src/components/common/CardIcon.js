import React from "react";
import { ReactComponent as VisaIcon } from "payment-icons/min/flat/visa.svg";
import { ReactComponent as MasterCardIcon } from "payment-icons/min/flat/mastercard.svg";
import { ReactComponent as DefaultCardIcon } from "payment-icons/min/flat/default.svg";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  icon: {
    height: 35,
    width: "auto",
    marginRight: 10,
  },
}));

const CardIcon = ({ brand }) => {
  const classes = useStyles();

  switch (brand) {
    case "visa":
      return <VisaIcon className={classes.icon} />;
    case "mastercard":
      return <MasterCardIcon className={classes.icon} />;
    default:
      return <DefaultCardIcon className={classes.icon} />;
  }
};

CardIcon.propTypes = {
  brand: PropTypes.string,
};

CardIcon.defaultProps = {
  brand: null,
};

export default CardIcon;
