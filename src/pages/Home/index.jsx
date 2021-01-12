import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Header, Menu, Note, AddButton, ModalNote } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import {
  fetchData,
  createData,
  updateData,
} from "../../stores/actions/todoAction";
import { changeInput } from "../../stores/actions/formAction";
import moment from "moment";

function Home(props) {
  const classes = useStyles();
  const {
    isLoadingState,
    todo,
    fetchData,
    changeInput,
    createData,
    updateData,
    form,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("In Progress");

  const menuList = [
    { name: "In Progress", icon: <AutorenewIcon /> },
    { name: "Finished", icon: <CheckBoxIcon /> },
  ];

  const onEdit = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  function compare(a, b) {
    const createdAtA = moment(a.createdAt).format();
    const createdAtB = moment(b.createdAt).format();
    let comparison = 0;
    if (page == "In Progress") {
      if (createdAtA > createdAtB) {
        comparison = 1;
      } else if (createdAtA < createdAtB) {
        comparison = -1;
      }
    } else {
      if (createdAtA > createdAtB) {
        comparison = -1;
      } else if (createdAtA < createdAtB) {
        comparison = 1;
      }
    }
    return comparison;
  }

  const generateItems = () => {
    let filter = page == "Finished" ? 1 : 0;
    let data = [];
    todo.forEach((obj) => {
      if (obj.status == filter) {
        data.push(obj);
      }
    });
    const rows = [...Array(Math.ceil(data.length / 4))];
    const datum = rows.map((row, idx) => data.slice(idx * 4, idx * 4 + 4));
    const content = datum.map((arr, idx) => {
      arr.sort(compare);
      return (
        <div className={classes.rowContent}>
          {arr.map((item, idx) => (
            <Note
              item={item}
              key={moment(item.createdAt).format()}
              expanded={expanded}
              setExpanded={setExpanded}
              onEdit={onEdit}
            />
          ))}
        </div>
      );
    });
    return content;
  };

  const { title, description, createdAt, status, id } = modalData;
  const onUpdateData = async () => {
    if (
      (form.title !== title || form.description !== description) &&
      (form.title.length || form.description.length)
    ) {
      const data = {
        id,
        title: form.title.length ? form.title : title,
        description: form.description.length ? form.description : description,
        createdAt,
        status,
      };
      await updateData(data);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  const onMarkAsDone = async () => {
    const data = {
      id,
      title: form.title.length ? form.title : title,
      description: form.description.length ? form.description : description,
      createdAt,
      status: 1,
    };
    await updateData(data);
    setShowModal(false);
  };

  const onMarkAsProgress = async () => {
    const data = {
      id,
      title: form.title.length ? form.title : title,
      description: form.description.length ? form.description : description,
      createdAt,
      status: 0,
    };
    await updateData(data);
    setShowModal(false);
  };

  const onDeleteData = async () => {
    const data = {
      id,
      title: form.title.length ? form.title : title,
      description: form.description.length ? form.description : description,
      createdAt,
      status: -1,
    };
    await updateData(data);
    setShowModal(false);
  };

  const onCreateData = async () => {
    const data = {
      id: todo.length + 1,
      title: form.title,
      description: form.description,
      createdAt: moment().format("YYYY-MM-DD hh:mm"),
      status: 0,
    };
    await createData(data);
    setShowModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [page]);

  useEffect(() => {
    if (!showModal) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [showModal]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.root}>
      <Header
        title="My To Do List"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        menu={<Menu menu={menuList} onClick={setPage} />}
      />
      {isLoading || isLoadingState ? (
        <CircularProgress
          color="secondary"
          size={60}
          className={classes.loading}
        />
      ) : (
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: isOpen,
          })}
        >
          <div className={classes.toolbar} />
          {generateItems()}
          <div className={classes.addButton}>
            <AddButton onClick={() => setShowModal(true)} />
          </div>
          <ModalNote
            show={showModal}
            toggle={() => setShowModal(false)}
            item={modalData}
            onChange={changeInput}
            onCreate={onCreateData}
            onUpdate={onUpdateData}
            onDelete={onDeleteData}
            onMarkAsDone={onMarkAsDone}
            onMarkAsProgress={onMarkAsProgress}
            form={form}
          />
        </main>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  content: {
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.spacing(9) + 1,
    marginTop: 50,
    flexGrow: 1,
  },
  rowContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 200,
  },
  addButton: {
    position: "absolute",
    right: "5%",
    bottom: "10%",
  },
}));

const mapStateToProps = (state) => {
  return {
    isLoadingState: state.todoState.isLoading,
    todo: state.todoState.todo,
    form: state.formState,
  };
};

const mapDispatchToProps = { fetchData, changeInput, updateData, createData };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
