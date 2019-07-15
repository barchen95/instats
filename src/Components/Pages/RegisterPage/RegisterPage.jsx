import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { FaAddressCard } from "react-icons/fa";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { userActions } from "Actions";
import ImageUploader from "react-images-upload";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by Yoni"}
    </Typography>
  );
}

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class RegisterPageComponent extends React.Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      imageURL: ""
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const { email, password, lastName, firstName } = this.state;
    const { dispatch } = this.props;
    if (email && password && firstName && lastName) {
      dispatch(userActions.register(this.state));
    }
  }

  uploadImage(pictures) {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      const image = new Image();
      image.src = binaryStr;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const _this = this;
      image.onload = function() {
        canvas.width = 100;
        canvas.height = 100;
        context.drawImage(this, 0, 0, 100, 100);

        _this.setState({ imageURL: canvas.toDataURL() });
      };
    };
    reader.readAsDataURL(pictures[0]);
  }

  render() {
    const { classes } = this.props;
    const { imageURL } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={imageURL}>
            {imageURL ? <></> : <FaAddressCard />}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={image => this.uploadImage(image)}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  singleImage
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowHavingFun" color="primary" />}
                  label="I want to enjoy the app and follow the rules"
                />
              </Grid>
            </Grid>
            <Button
              onClick={e => {
                this.handleSubmit(e);
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export const RegisterPage = connect(
  mapStateToProps,
  null
)(withStyles(styles)(RegisterPageComponent));
