import { Box, Container, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    size: {
        maxWidth: "100%",
        height: 350,
    }
  }),
);

const SkeletonItems = () => {
    const classes = useStyles();

  return (
    
    <Container fixed>
      <div className={classes.root}>
        <Grid container spacing={3}>
            { Array.from(new Array(8)).map((item: any, index: any) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box mt={1}>
                  <Skeleton variant="rect" className={classes.size} />
                  </Box>
                </Grid>
            )) 
            
            }
        
        </Grid>
      </div>    
    </Container>
    
  );
}

export default SkeletonItems;
