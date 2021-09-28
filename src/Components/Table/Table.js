import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableWrapper } from "./TableWrapper";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    color: "blue",
    fontSize: "1.2em",
    fontWeight: 700,
  },
  tableBody: {
    dispay: "flex",
    justifyContent: "center",
  },
  currentSelected: {
    color: "red",
  },
  notSelected: {
    color: "black",
  },
});

export const UserTable = () => {
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const [edit, setEdit] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [current, setCurrent] = useState(null);
  const fetchUsers = async () => {
    let data = await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    console.log(data);
    setUsers(data);
  };

  const deleteHandler = (id) => {
    let temp = [];
    for (let x = 0; x < users.length; x += 1) {
      if (users[x].id !== id) {
        temp.push(users[x]);
      }
    }
    setUsers(temp);
  };

  const setEditHandler = (row) => {
    if (current == null) {
      setEdit({
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        phone: row.phone,
        website: row.website,
      });
      setCurrent(row.id);
    } else {
      setCurrent(null);
    }
  };

  const inputChangeHandler = (event) => {
    let val = edit;
    val[event.target.placeholder] = event.target.value;
    setEdit(val);
    console.log(edit);
  };

  const editHandler = () => {
    console.log("edited");
    let temp = [];
    for (let x = 0; x < users.length; x += 1) {
      if (users[x].id === edit.id) {
        temp.push(edit);
      } else {
        temp.push(users[x]);
      }
    }
    setUsers(temp);
    setCurrent(null);
  };

  const addHandler = () => {
    let vals = edit;
    vals["id"] = Math.floor(Math.random() * 100000 + 1);

    setUsers(users.concat(vals));
    setEdit({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <TableWrapper>
      <div className="main">
        <h1 className="heading">User Table</h1>
        {!users ? (
          <div className="loader">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Name</TableCell>
                  <TableCell className={classes.tableHead}>Username</TableCell>
                  <TableCell className={classes.tableHead}>Email</TableCell>
                  <TableCell className={classes.tableHead}>Phone</TableCell>
                  <TableCell className={classes.tableHead}>Website</TableCell>

                  {/* <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      type="text"
                      onChange={inputChangeHandler}
                      placeholder="name"
                      // defaultValue={edit.name}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      onChange={inputChangeHandler}
                      placeholder="username"
                      // defaultValue={edit.username}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      onChange={inputChangeHandler}
                      placeholder="email"
                      // defaultValue={edit.email}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      onChange={inputChangeHandler}
                      placeholder="phone"
                      // defaultValue={edit.phone}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      onChange={inputChangeHandler}
                      placeholder="website"
                      // defaultValue={edit.website}
                    />
                  </TableCell>

                  <TableCell className={classes.tableHead}>
                    {current !== null ? (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={editHandler}
                        >
                          Apply
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addHandler}
                      >
                        Add
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      className={
                        row.id === current
                          ? classes.currentSelected
                          : classes.notSelected
                      }
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      className={
                        row.id === current
                          ? classes.currentSelected
                          : classes.notSelected
                      }
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      className={
                        row.id === current
                          ? classes.currentSelected
                          : classes.notSelected
                      }
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      className={
                        row.id === current
                          ? classes.currentSelected
                          : classes.notSelected
                      }
                    >
                      {row.phone}
                    </TableCell>
                    <TableCell
                      className={
                        row.id === current
                          ? classes.currentSelected
                          : classes.notSelected
                      }
                    >
                      {row.website}
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                      <Button
                        color="primary"
                        onClick={() => {
                          setEditHandler(row);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                      <Button
                        color="secondary"
                        onClick={() => {
                          deleteHandler(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </TableWrapper>
  );
};
