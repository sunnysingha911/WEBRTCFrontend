import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Peer from "peerjs";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chat from "./Chat";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  },
  video: {
    width: "100%",
  },
  IconBtn: {
    backgroundColor: "#eceff1",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    "&:focus": {
      backgroundColor: "#e0e0e0",
    },
  },
  ActiveIcon: {
    color: "red",
  },
  streamControl: {
    display: "flex",
    margin: "1rem 0",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "1rem",
    backgroundColor: "#fafafa",
    borderRadius: 5,
  },
  errorDevices: {
    width: "100%",
  },
});

export default ({ roomId, peerId }) => {
  const classes = useStyles();

  const [conn, setConn] = useState();
  const [myVideoStream, setMyVideoStream] = useState();
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);

  const [deviceError, setDeviceError] = useState();

  let userVideo = useRef();

  const peer = new Peer({
    host: "/",
    port: 4000,
    path: "/webrtcApp",
    debug: true,
  });

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMyVideoStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }

          const conn = peer.connect(peerId);
          setConn(conn);

          const call = peer.call(peerId, stream);
          let videoPeers = [];
          call.on("stream", (remoteStream) => {
            if (!videoPeers.includes(remoteStream.id)) {
              videoPeers.push(remoteStream.id);

              let video = document.createElement("video");
              video.srcObject = remoteStream;
              video.setAttribute("playInline", true);
              video.setAttribute("autoPlay", true);
              video.className = classes.video;
              document.getElementById("video").appendChild(video);
            }
          });
        })
        .catch((error) => {
          setDeviceError("Unable To Use Media Devices");
        });
    } catch (error) {
      setDeviceError("Unable To Use Media Devices");
    }
  }, []);

  const enableMic = () => {
    if (myVideoStream) myVideoStream.getAudioTracks()[0].enabled = true;
    setMic(false);
  };

  const disableMic = () => {
    if (myVideoStream) myVideoStream.getAudioTracks()[0].enabled = false;
    setMic(true);
  };

  const enableCam = () => {
    if (myVideoStream) myVideoStream.getVideoTracks()[0].enabled = true;
    setCamera(false);
  };

  const disableCam = () => {
    if (myVideoStream) {
      myVideoStream.getVideoTracks()[0].enabled = false;
    }
    setCamera(true);
  };

  return (
    <div className={classes.root}>
      {!deviceError && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9}>
            <Grid container spacing={3}>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={6}
              >
                <video
                  className={classes.video}
                  playsInline
                  muted
                  ref={userVideo}
                  autoPlay
                />
              </Grid>
              <Grid
                id="video"
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={6}
              ></Grid>
            </Grid>

            <div className={classes.streamControl}>
              <div>
                {!mic ? (
                  <IconButton
                    className={classes.IconBtn}
                    onClick={() => disableMic()}
                  >
                    <MicIcon className={classes.ActiveIcon} />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.IconBtn}
                    onClick={() => enableMic()}
                  >
                    <MicOffIcon />
                  </IconButton>
                )}
              </div>
              <div>
                {!camera ? (
                  <IconButton
                    className={classes.IconBtn}
                    onClick={() => disableCam()}
                  >
                    <VideocamIcon className={classes.ActiveIcon} />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.IconBtn}
                    onClick={() => enableCam()}
                  >
                    <VideocamOffIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Chat roomId={roomId} conn={conn} />
          </Grid>
        </Grid>
      )}
      {deviceError && (
        <Alert severity="error" className={classes.errorDevices}>
          <AlertTitle>Error</AlertTitle>
          {deviceError}
        </Alert>
      )}
    </div>
  );
};
