import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


export default function Menu(props) {
  const { menu, onClick } = props;
  return (
    <>
      <List>
        {menu.map((item, index) => (
          <ListItem button key={item.name} onClick={() => onClick(item.name)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
