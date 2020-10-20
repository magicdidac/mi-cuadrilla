export const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.white
  },
  logo: {
    boxShadow: "0px 0px 50px " + theme.palette.white,
    borderRadius: "30px"
  },
  paper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, " + theme.palette.primary.light + " 60%, " + theme.palette.primary.dark + " 100%)",
  },
  field: {
    margin: "10px",
  },
  field_label: {
    color: theme.palette.white + ' !important'
  },
  field_input: {
    color: theme.palette.white + ' !important',
    minWidth: '250px'
  },
  backForm: {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: '20px',
    margin: '10px',
    paddingTop: '70px',
    paddingBottom: '70px',
    minWidth: '350px',
    minHeight: '150px'
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.white,
    marginTop: '25px'
  },
  forgotPassword: {
    textDecoration: 'none',
    color: theme.palette.white,
    cursor: 'pointer',
    marginTop: '1rem',
    fontSize: 14
  }
});
