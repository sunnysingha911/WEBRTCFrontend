import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

// CUSTOM COMPONENTS
import InitVideo from "../components/InitVideo";
import JoinVideo from "../components/JoinVideo";

// REDUX
import { joinRoom } from "../redux/actions/JoinRoom";
import { appBarName } from "../redux/actions/Appbar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  errorDevices: {
    width: "100%",
    margin: "1rem",
  },
});

export default ({ location, history }) => {
  const { roomid, peerid } = queryString.parse(location.search);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState();
  const [userJoin, setUserJoin] = useState();
  const [event, setEvent] = useState(false);

  const joiningRoom = useSelector((state) => state.JoinRoomReducer.joiningRoom);
  const room = useSelector((state) => state.JoinRoomReducer.room);
  const error = useSelector((state) => state.JoinRoomReducer.error);
  const user = useSelector((state) => state.UserReducer.user);
  const fetchUserError = useSelector((state) => state.UserReducer.error);

  useEffect(() => {
    dispatch(joinRoom(roomid));
  }, []);

  useEffect(() => {
    if (room) {
      setRoomName(room.roomname);
      dispatch(appBarName(roomName));
    }
  });
  useEffect(() => {
    if (fetchUserError) {
      history.push("/login");
    }
  }, [fetchUserError]);

  return (
    <div className={classes.root}>
      <Container>
        {error && (
          <Alert severity="error" className={classes.errorDevices}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {user && (
          <>
            {room && (
              <Grid container spacing={3}>
                {!peerid && (
                  <Grid item xs={12}>
                    <InitVideo roomId={room._id} />
                  </Grid>
                )}
                {peerid && (
                  <Grid item xs={12}>
                    <JoinVideo roomId={room._id} peerId={peerid} />
                  </Grid>
                )}
              </Grid>
            )}
          </>
        )}
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={event}
        autoHideDuration={5000}
        onClose={() => setEvent(false)}
        message={userJoin}
      />
    </div>
  );
};
