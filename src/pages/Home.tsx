import { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Container, Grid } from '@material-ui/core';
import Items from '../organisms/Items';
import Pagination from '../molecules/PaginationLink';
import request from '../helpers/requests';

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

const Home = () => {
  const classes = useStyles();

  const [items, setItems] = useState({ products: [] });
  const [count, setCount] = useState<any | null>(null);

  const getItems = (page: number) => {
    setItems({ products: [] }); // clean cache
    request.getItems(page).then(result => {
      const count = Math.ceil(result.data.count / result.data.page_size);
      setItems(result.data);
      setCount(count);
    }).catch(error => console.log(error))
  }

  
  useEffect(() => {
    if (items.products.length < 1) {
      getItems(1);
    }
  }, []);

  return (
    <>
      <Box mt={8} mb={3}>
        <Items items={items.products} />
      </Box>

      {
        (count > 0) &&

        <Container fixed>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={2} md={4} />
              <Grid item xs={9} sm={8} md={6}>
                <Pagination getItems={getItems} count={count} />
              </Grid>
              <Grid item xs={1} sm={2} />
            </Grid>
          </div>
        </Container>

      }

    </>
  );
}

export default Home;
