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
  const {
    show,
    toggle,
    item,
    onChange,
    onCreate,
    onUpdate,
    onMarkAsDone,
    onMarkAsProgress,
    onDelete,
    form,
  } = props;
  const { title, description, createdAt, status, id } = item;
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
              name="title"
              defaultValue={title}
              fullWidth
              variant="outlined"
              onChange={onChange}
              helperText="Input your to do title"
            />
          </div>
          <div className={classes.textContainer}>
            <TextField
              name="description"
              variant="outlined"
              multiline
              rows={4}
              defaultValue={description}
              fullWidth
              onChange={onChange}
              helperText="Input your to do description"
            />
          </div>
          {item?.id ? (
            <>
              <Button variant="contained" color="primary" onClick={onUpdate}>
                Update
              </Button>
              {status != 1 ? (
                <>
                  <Button
                    variant="contained"
                    color="default"
                    style={{ margin: 10 }}
                    onClick={onMarkAsDone}
                  >
                    Mark as Done
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="default"
                  style={{ margin: 10 }}
                  onClick={onMarkAsProgress}
                >
                  Mark as In Progress
                </Button>
              )}
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="primary" onClick={onCreate}>
                Create
              </Button>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
