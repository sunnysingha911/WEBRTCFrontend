import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

// REDUX
import { login } from "../redux/actions/Login";
import { getUser } from "../redux/actions/User";
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

  const logging = useSelector((state) => state.LoginReducer.logging);
  const user = useSelector((state) => state.LoginReducer.user);
  const error = useSelector((state) => state.LoginReducer.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const identifier = e.target.emailId.value;
    const password = e.target.password.value;
    dispatch(login(identifier, password));
  };

  useEffect(() => {
    dispatch(appBarName("Login"));
    if (user || error || logging) {
      setStatus(true);
    }
    if (status) {
      setTimeout(() => {
        setStatus(false);
      }, 5000);
    }
    if (user) {
      dispatch(getUser());
      history.push("/");
    }
  }, [user, error, logging]);

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit} className={classes.cardContent}>
            <TextField
              className={classes.textField}
              type="email"
              required
              name="emailId"
              label="Email Id"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              type="password"
              required
              name="password"
              label="Password"
              variant="outlined"
            />
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Login
            </Button>
            <Typography align="center">
              Don't have an account?{" "}
              <Link to="/register" className={classes.link}>
                Create
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
      {status && (
        <>
          {user && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="success" color="success">
                Login Success
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
          {logging && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="info" color="info">
                Logging in...
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </Container>
  );
};
