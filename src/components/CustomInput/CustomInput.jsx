import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    multiline
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var feedbackClasses = classes.feedback;
  if (inputProps !== undefined) {
    if (inputProps.endAdornment !== undefined) {
      feedbackClasses = feedbackClasses + " " + classes.feedbackRight;
    }
  }
  return (
    <FormControl {...formControlProps} className={inputProps.class ? inputProps.class + " merritos-textbox " + formControlClasses : "merritos-textbox " + formControlClasses}>
      {/* {labelText !== undefined ? (
        <InputLabel
         
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null} */}
      <Input

        id={id}
        disableUnderline="true"
        multiline={multiline}
        margin="dense"
        className={error ? 'errorinput' : ''}
        error="true"
        label="Dense"
        placeholder={labelText}
        variant="outlined"

        {...inputProps}
      />
      {error ? (
        {
          ...inputProps.alt === "confirmPassword" ? (
            <span className="errortext">Passwords didn't match</span>
          ) : (
              {
                ...inputProps.type === "email" ? (
                  <span className="errortext">Please enter a valid email address</span>
                ) : (
                    {
                      ...inputProps.type === "password" ? (
                        <span className="errortext">Please enter a valid password</span>
                      ) : (
                          {
                            ...inputProps.type === "number" ? (
                              <span className="errortext">Please enter numbers only</span>
                            ) : (
                                <span className="errortext">This field is required</span>
                              )
                          }
                        )
                    })
              }
            )
        }
      ) : null}
      {/* {error ? (
        <Clear className={feedbackClasses + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={feedbackClasses + " " + classes.labelRootSuccess} />
      ) : null} */}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};

export default withStyles(styles)(CustomInput);