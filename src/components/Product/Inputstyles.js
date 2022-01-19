import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFieldLabel: {
    letterSpacing: "0.1rem!important",
    "&$textFieldLabelFocused": {
      color: "#102a42",
    },
    "&::placeholder": {
      color: "green",
    },
  },
  textFieldLabelFocused: {},
  textFieldRoot: {
    padding: "0.15rem",
    background: "#f1f5f8",
    borderRadius: "0.25rem",
    borderColor: "transparent",
    letterSpacing: "0.1rem!important",
    height: "1.8rem",
    maxWidth: "10rem",
    "&:hover": {
      color: "#102a42",
    },

    "&:hover $textFieldNotchedOutline": {
      borderColor: "#102a42",
    },

    "&$textFieldFocused $textFieldNotchedOutline": {
      borderColor: "#102a42",
    },
  },
  textFieldFocused: {},
  textFieldNotchedOutline: {},
  selectRoot: {
    "&.MuiSelect-select": {
      width: "120px",
      textAlign: "left",
      padding: "0 0.5rem !important",
      background: "#f1f5f8 !important",
      borderRadius: "0.25rem !important",
      border: "1px solid lightgrey !important",
      letterSpacing: "0.1rem!important",
      height: "1rem!important",
      display: "flex",
      flexDirection: "column",
      "&:hover": {
        border: "1px solid #102a42!important",
      },
      "&:focus": {
        backgroundColor: "#f1f5f8!important",
        borderColor: "#102a42!important",
      },
      "&:active": {
        backgroundColor: "#f1f5f8!important",
        borderColor: "#102a42!important",
      },
    },
  },
  label: {
    display: "none",
  },
  selectOutline: {
    width: "100px",
    textAlign: "left",
    padding: "0 0.5rem !important",
    background: "#f1f5f8 !important",
    borderRadius: "0.25rem !important",
    border: "1px solid transparent !important",
    letterSpacing: "0.1rem!important",
    height: "1.8rem!important",
    "&:hover": {
      border: "1px solid red!important",
    },
    "&:focus": {
      border: "1px solid green!important",
    },
    "&:active": {
      backgroundColor: "#f1f5f8!important",
      borderColor: "#102a42!important",
    },
  },
}));
export default useStyles;
