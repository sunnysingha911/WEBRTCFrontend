import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// MATERIAL UI ICON
import SendIcon from "@material-ui/icons/Send";

// REDUX
import { sendMessage } from "../redux/actions/SendMessage";
import { getMessages } from "../redux/actions/GetMessages";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "2rem",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  input: {
    flex: "auto",
    display: "flex",
    width: "100%",
    paddingRight: "1rem",
  },
  button: {
    height: 40,
  },
  textBox: {
    margin: theme.spacing(1),
  },
  messages_1: {
    padding: "5% 0",
    overflow: "hidden",
    flex: "auto",
    height: "23rem",
  },
}));

export default ({ roomId, conn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);

  const sendingMessage = useSelector(
    (state) => state.SendMessageReducer.sendingMessage
  );
  const user = useSelector((state) => state.UserReducer.user);
  const gettingMessages = useSelector(
    (state) => state.GetMessagesReducer.gettingMessages
  );
  let messages = useSelector((state) => state.GetMessagesReducer.messages);

  useEffect(() => {
    dispatch(getMessages(roomId));
  }, []);

  useEffect(() => {
    if (messages) {
      setMessageList([...messages]);
      if (conn) {
        conn.on("data", (data) => {
          messages.push(data);
          setMessageList([...messages]);
        });
      }
    }
  }, [messages, conn]);

  const sendChat = (e) => {
    e.preventDefault();
    const chatObj = {
      chat: e.target.chat.value,
      userName: user.username,
      user: user._id,
    };
    conn.send(chatObj);
    messages.push(chatObj);
    setMessageList([...messages]);
    dispatch(sendMessage(e.target.chat.value, user._id, roomId));
    e.target.chat.value = "";
  };

  return (
    <div className={classes.root}>
      {messageList && (
        <ScrollToBottom className={classes.messages_1}>
          {gettingMessages ? (
            <center>
              <CircularProgress />
            </center>
          ) : (
            <>
              {messages && (
                <>
                  {messageList.map((message, i) => (
                    <div key={i}>
                      <Message
                        message={message.chat}
                        userId={message.user}
                        name={message.userName}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </ScrollToBottom>
      )}

      {conn && (
        <>
          <form onSubmit={sendChat} className={classes.input}>
            <TextField
              className={classes.textBox}
              required
              name="chat"
              fullWidth
              label="Chat"
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              disabled={sendingMessage ? true : false}
              color="secondary"
              endIcon={
                sendingMessage ? <CircularProgress size={20} /> : <SendIcon />
              }
            >
              {sendingMessage ? <>Sending </> : <>Send</>}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
