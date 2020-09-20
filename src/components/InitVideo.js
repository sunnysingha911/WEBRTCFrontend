import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Peer from "peerjs";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

// MATERIAL UI ICONS
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

import Chat from "./Chat";
import { Container } from "@material-ui/core";

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
  link: {
    display: "flex",
  },
  shareLink: {
    marginTop: "2rem",
  },
  IconBtn: {
    // margin: '1rem',
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
});

export default ({ roomId }) => {
  const classes = useStyles();

  let userVideo = useRef();

  const [shareURL, setShareURL] = useState();
  const [copySuccess, setCopySuccess] = useState();
  const [conn, setConn] = useState();
  const [myVideoStream1, setMyVideoStream1] = useState();
  const [myVideoStream2, setMyVideoStream2] = useState();
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);

  const [deviceError, setDeviceError] = useState();

  const peer = new Peer({
    host: "/",
    port: 4000,
    path: "/webrtcApp",
    debug: true,
  });

  useEffect(() => {
    peer.on("open", (peerId) => {
      setShareURL(`${window.location.href}&peerid=${peerId}`);
    });
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMyVideoStream1(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        })
        .catch((error) => {
          setDeviceError("Unable To Use Media Devices");
        });
    } catch (error) {
      setDeviceError("Unable To Use Media Devices");
    }
  }, []);

  let videoPeers = [];
  peer.on("call", (call) => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMyVideoStream2(stream);
          call.answer(stream);
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
  });

  peer.on("connection", (conn) => {
    setConn(conn);
  });

  const enableMic = () => {
    if (myVideoStream1) myVideoStream1.getAudioTracks()[0].enabled = true;
    if (myVideoStream2) myVideoStream2.getAudioTracks()[0].enabled = true;
    setMic(false);
  };

  const disableMic = () => {
    if (myVideoStream1) myVideoStream1.getAudioTracks()[0].enabled = false;
    if (myVideoStream2) myVideoStream2.getAudioTracks()[0].enabled = false;
    setMic(true);
  };

  const enableCam = () => {
    if (myVideoStream1) myVideoStream1.getVideoTracks()[0].enabled = true;
    if (myVideoStream2) myVideoStream2.getVideoTracks()[0].enabled = true;
    setCamera(false);
  };

  const disableCam = () => {
    if (myVideoStream1) {
      myVideoStream1.getVideoTracks()[0].enabled = false;
    }
    if (myVideoStream2) {
      myVideoStream2.getVideoTracks()[0].enabled = false;
    }
    setCamera(true);
  };

  return (
    <Container className={classes.root}>
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

            <Alert severity="info" className={classes.shareLink}>
              <AlertTitle>Room Join Link</AlertTitle>
              <div className={classes.link}>
                {shareURL}
                <IconButton
                  className={classes.IconBtn}
                  onClick={() => {
                    try {
                      navigator.clipboard
                        .writeText(shareURL)
                        .then(() => setCopySuccess(true));
                    } catch (error) {
                      setCopySuccess(false);
                    }
                  }}
                >
                  <FileCopyOutlinedIcon />
                </IconButton>
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={copySuccess}
                autoHideDuration={3000}
                onClose={() => setCopySuccess(false)}
                message={
                  copySuccess == true
                    ? "Copied Successfully To Clipboard"
                    : "Unable to Copy link"
                }
              />
            </Alert>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Chat roomId={roomId} conn={conn} />
          </Grid>
        </Grid>
      )}
      {deviceError && (
        <Alert severity="error" className={classes.shareLink}>
          <AlertTitle>Error</AlertTitle>
          {deviceError}
        </Alert>
      )}
    </Container>
  );
};
