import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

// REDUX
import { register } from "../redux/actions/Register";
import { appBarName } from "../redux/actions/Appbar";
import { getUser } from "../redux/actions/User";

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

  const [registerAs, setRegisterAs] = useState("");
  const [status, setStatus] = React.useState(false);

  let logging = useSelector((state) => state.RegisterReducer.logging);
  let user = useSelector((state) => state.RegisterReducer.user);
  let error = useSelector((state) => state.RegisterReducer.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.userName.value;
    const email = e.target.emailId.value;
    const password = e.target.password.value;
    const role = registerAs;
    if (role) dispatch(register(username, email, password, role));
    else setStatus(true);
  };

  useEffect(() => {
    dispatch(appBarName("Register User"));
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
            Create Account
          </Typography>
          <form onSubmit={handleSubmit} className={classes.cardContent}>
            <TextField
              className={classes.textField}
              name="userName"
              required
              label="User Name"
              variant="outlined"
            />
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
            <FormControl
              className={classes.button}
              variant="outlined"
              fullWidth
            >
              <InputLabel>Create Account as</InputLabel>
              <Select
                value={registerAs}
                onChange={(e) => setRegisterAs(e.target.value)}
              >
                <MenuItem value="Employee">Job-Seeker</MenuItem>
                <MenuItem value="Employer">Employer</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Create
            </Button>
            <Typography align="center">
              Already have an account?{" "}
              <Link to="/login" className={classes.link}>
                Login
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
          {!registerAs && (
            <Snackbar
              open={status}
              autoHideDuration={3000}
              onClose={() => setStatus(false)}
            >
              <Alert severity="warning" color="warning">
                Select a role
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </Container>
  );
};
