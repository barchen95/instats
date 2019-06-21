import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { withTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    backgroundColor: theme.palette.primary.main,
    marginTop: "18em"
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
        label="Recents"
        className={classes.cell}
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        className={classes.cell}
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        className={classes.cell}
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
}

export default withTheme(LabelBottomNavigation);
