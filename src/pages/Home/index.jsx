import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Header, Menu, Note, AddButton, ModalNote } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

const data = [
  {
    id: 1,
    title: "Make a meal",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-15 18:00",
  },
  {
    id: 2,
    title: "Dinner with family",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-16 18:00",
  },
  {
    id: 3,
    title: "Watch scary movie",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-15 13:00",
  },
  {
    id: 4,
    title: "Learn something new",
    description: "lorem ipsum",
    status: 1,
    createdAt: "2019-11-15 08:00",
  },
  {
    id: 5,
    title: "Make a phone call to mom",
    description: "lorem ipsum",
    status: 1,
    createdAt: "2019-11-15 04:00",
  },
];

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

function Home() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("");

  const menuList = [
    { name: "In Progress", icon: <AutorenewIcon /> },
    { name: "Finished", icon: <CheckBoxIcon /> },
  ];

  const onEdit = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const rows = [...Array(Math.ceil(data.length / 4))];
  const datum = rows.map((row, idx) => data.slice(idx * 4, idx * 4 + 4));
  const content = datum.map((arr, idx) => (
    <div className={classes.rowContent}>
      {arr.map((item, idx) => (
        <Note
          item={item}
          key={idx}
          expanded={expanded}
          setExpanded={setExpanded}
          onEdit={onEdit}
        />
      ))}
    </div>
  ));

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [page]);

  return (
    <div className={classes.root}>
      <Header
        title="My To Do List"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        menu={<Menu menu={menuList} onClick={setPage} />}
      />
      {isLoading ? (
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
          {content}
          <div className={classes.addButton}>
            <AddButton onClick={() => console.log("add")} />
          </div>
          <ModalNote
            show={showModal}
            toggle={() => setShowModal(false)}
            item={modalData}
          />
        </main>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
