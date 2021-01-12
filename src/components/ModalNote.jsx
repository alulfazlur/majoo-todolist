import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #ffff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textContainer: {
    marginBottom: 20,
  },
}));

export default function ModalNote(props) {
  const classes = useStyles();
  const { show, toggle, item } = props;
  const { title, description, createdAt, status } = item;

  return (
    <Modal
      className={classes.modal}
      open={show}
      onClose={toggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className={classes.paper}>
          <div className={classes.textContainer}>
            <TextField
              id="outlined-helperText"
              label="Title"
              value={title}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className={classes.textContainer}>
            <TextField
              id="outlined-helperText"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              fullWidth
            />
          </div>
          <Button variant="contained" color="primary">
            Update
          </Button>
          {status != 1 ? (
            <>
              <Button
                variant="contained"
                color="default"
                style={{ margin: 10 }}
              >
                Mark as Done
              </Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
            </>
          ) : (
            <Button variant="contained" color="default" style={{ margin: 10 }}>
              Mark as In Progress
            </Button>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
