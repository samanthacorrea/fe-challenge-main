import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Item from '../molecules/Item';
import SkeletonItems from '../molecules/SkeletonItems'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


const Items = (props: any) => {
  const classes = useStyles();

  const { items } = props;

  return (

    <>

    <Container fixed>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {(items.length < 1) && <SkeletonItems />}
          {items?.map((item: any, index: any) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Item item={item} />
            </Grid>
            
          ))

          }

        </Grid>


      </div>
    </Container>

    </>

  );
}

export default Items;