import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  sent: {
    backgroundColor: "#F3F3F3",
    padding: 20,
  },
  received: {
    backgroundColor: "#2979FF",
    padding: 20,
    color: "#fff",
  },
});

const Message = ({ message, userId, history, name }) => {
  let isSentByCurrentUser = false;
  const classes = useStyles();
  const user = useSelector((state) => state.UserReducer.user);

  if (user) {
    if (user._id == userId) {
      isSentByCurrentUser = true;
    }
  }

  return isSentByCurrentUser ? (
    <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
      <Typography color="textSecondary" display="inline" gutterBottom>
        {name}
      </Typography>
      <Box borderRadius={25} className={classes.sent}>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  ) : (
    <Box display="flex" flexDirection="row" p={1} m={1}>
      <Typography color="textSecondary" display="block" gutterBottom>
        {name}
      </Typography>
      <Box borderRadius={25} className={classes.received}>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
