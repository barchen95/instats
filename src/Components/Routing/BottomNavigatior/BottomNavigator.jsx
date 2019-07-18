import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import { FaFutbol } from "react-icons/fa";
import { Link } from "react-router-dom";
import FaceIcon from "@material-ui/icons/FaceSharp";
import { withTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    bottom: "0px",
    position: "fixed"
  },
  "@media (max-height: 500px)": {
    root: {
      display: "none"
    }
  },
  cell: {
    "&.MuiBottomNavigationAction-root.Mui-selected": {
      color: "white"
    },
    "&:focus": {
      color: "white"
    },

    color: "white"
  }
}));
function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        className={classes.cell}
        value="home"
        component={Link}
        to="/"
        icon={<HomeIcon style={{ width: "30px", height: "30px" }} />}
      />
      <BottomNavigationAction
        label="Current Match"
        className={classes.cell}
        value="Current Match"
        component={Link}
        to="/match"
        icon={<FaFutbol style={{ width: "30px", height: "30px" }} />}
      />
      <BottomNavigationAction
        className={classes.cell}
        component={Link}
        to="/profile"
        label="Profile"
        value="Profile"
        icon={<FaceIcon style={{ width: "30px", height: "30px" }} />}
      />
    </BottomNavigation>
  );
}

export default withTheme(LabelBottomNavigation);
