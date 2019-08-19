const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    spacer: {
      flex: '1 1 100%',
    },
    back:{
      margin:5,
      marginBottom:0,
    },
    buttonfloat: {
      margin:5,
      marginBottom:0,
      float: 'right',
    },
    actionButton: {
      margin: "0 0 0 5px",
      padding: "5px",
      "& svg": {
        marginRight: "0px"
      }
    },
    actionButtonRound: {
      width: "auto",
      height: "auto",
      minWidth: "auto"
    },
    tableHead: {
        fontSize: 20,
    },
    button: {
      display: 'block',
      marginTop: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });
 

  export default styles;