import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItem from "@material-ui/core/ListItem";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router";
import List from "@material-ui/core/List";
import {
  HOME_PATH,
  PAYMENT_OPTIONS_PATH,
  SUBSCRIPTIONS_PATH,
} from "../../config/paths";

const MainMenu = () => {
  const { t } = useTranslation();
  const [dense] = useState(true);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const goTo = (path) => {
    push(path);
  };

  return (
    <List dense={dense}>
      <ListItem
        button
        onClick={() => goTo(HOME_PATH)}
        selected={pathname === HOME_PATH}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>

        <ListItemText primary={t("Profile")} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(SUBSCRIPTIONS_PATH)}
        selected={pathname === SUBSCRIPTIONS_PATH}
      >
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary={t("Subscriptions")} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(PAYMENT_OPTIONS_PATH)}
        selected={pathname === PAYMENT_OPTIONS_PATH}
      >
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary={t("Payment Options")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t("Preferences")} />
      </ListItem>
    </List>
  );
};

export default MainMenu;
