import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

// REDUX
import { createRoom } from "../redux/actions/CreateRoom";
import { appBarName } from "../redux/actions/Appbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    minWidth: 300,
    maxWidth: 350,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    margin: 25,
  },
  textField: {
    margin: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  link: { textDecoration: "none" },
});

export default ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(false);

  const creatingRoom = useSelector(
    (state) => state.CreateRoomReducer.creatingRoom
  );
  const room = useSelector((state) => state.CreateRoomReducer.room);
  const error = useSelector((state) => state.CreateRoomReducer.error);
  const user = useSelector((state) => state.UserReducer.user);
  const fetchUserError = useSelector((state) => state.UserReducer.error);

  useEffect(() => {
    dispatch(appBarName("Create Room"));
  }, []);

  useEffect(() => {
    console.log("Create Room");
    if (room || error || creatingRoom) {
      setStatus(true);
    }

    if (status) {
      setTimeout(() => {
        setStatus(false);
      }, 5000);
    }
    if (room) {
      const { roomid } = room;
      history.push(`/chatroom?roomid=${roomid}`);
    }
  }, [room, error, creatingRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomName = e.target.roomName.value;
    dispatch(createRoom(roomName, user));
  };

  useEffect(() => {
    if (fetchUserError) {
      history.push("/login");
    }
  }, [fetchUserError]);

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Create Room
          </Typography>
          <form className={classes.cardContent} onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              required
              name="roomName"
              label="Room Name"
              variant="outlined"
            />
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Create Room
            </Button>
          </form>
        </CardContent>
      </Card>
      {status && (
        <>
          {room && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="success" color="success">
                Room Created Successfully
              </Alert>
            </Snackbar>
          )}
          {error && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="error" color="error">
                {error}
              </Alert>
            </Snackbar>
          )}
          {creatingRoom && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="info" color="info">
                Creating Room...
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </Container>
  );
};
