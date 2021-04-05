import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import notFoundGif from '../helpers/images/notFound.gif';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container fixed>
      <Box className={classes.root}>
        <Box mt={15} mb={2}>
          <img src={notFoundGif} alt="Not found gif" />
        </Box>
        <Typography variant="h5" gutterBottom>
          The page you requested does not exist or no longer exists.<br />
             You can continue your visit by clicking below.
          </Typography>

        <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Button variant="contained" size="large" color="secondary">
            See all wines
            </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default NotFound;

