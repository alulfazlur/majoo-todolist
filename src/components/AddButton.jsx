import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function AddButton(props) {
  const { onClick } = props;
  return (
    <Fab color="secondary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
}
