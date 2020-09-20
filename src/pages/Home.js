import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// MATERIAL UI COMPONENT
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// REDUX
import { appBarName } from "../redux/actions/Appbar";

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

  const fetchingUser = useSelector((state) => state.UserReducer.fetchingUser);
  const user = useSelector((state) => state.UserReducer.user);
  const fetchUserError = useSelector((state) => state.UserReducer.error);

  useEffect(() => {
    dispatch(appBarName("Home"));
  }, []);

  useEffect(() => {
    if (fetchUserError) {
      history.push("/login");
    }
  }, [fetchUserError]);

  return (
    <Container className={classes.root}>
      {fetchingUser && (
        <>
          <CircularProgress />
          <Typography variant="h5">Loading...</Typography>
        </>
      )}
      {user && (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Home
            </Typography>
            {user.role.type === "employer" && (
              <>
                <Link to="/createroom" className={classes.link}>
                  <Button variant="contained" color="secondary">
                    Create Room
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
