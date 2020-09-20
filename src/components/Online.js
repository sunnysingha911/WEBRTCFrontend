import React from "react";

// MATERIAL UI COMPONENTS
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    margin: 10,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Online
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
