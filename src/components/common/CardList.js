import React, { useContext } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { hooks } from "../../config/queryClient";
import { AddCardModalContext } from "../context/AddCardModalContext";
import CardIcon from "./CardIcon";

const { useCards } = hooks;

const CardList = ({ handleCardSelection, selected }) => {
  const { t } = useTranslation();
  const { data: cards = [] } = useCards();

  const { openModal: openAddCardModal } = useContext(AddCardModalContext);

  const addCard = () => openAddCardModal();

  return (
    <List component="nav">
      {cards.map((card) => (
        <ListItem
          button
          onClick={handleCardSelection(card)}
          selected={card.id === selected}
        >
          <ListItemIcon>
            <CardIcon brand={card?.brand} />
          </ListItemIcon>
          <ListItemText>
            {card?.brand?.toUpperCase()} •••• •••• •••• {card?.lastFourDigits}
          </ListItemText>
        </ListItem>
      ))}
      <ListItem button onClick={addCard}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>{t("Add Card")}</ListItemText>
      </ListItem>
    </List>
  );
};

CardList.propTypes = {
  handleCardSelection: PropTypes.func,
  selected: PropTypes.string,
};

CardList.defaultProps = {
  handleCardSelection: null,
  selected: null,
};

export default CardList;
