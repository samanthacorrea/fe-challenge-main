import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Box, Grid, Container } from '@material-ui/core';
import ImgDefault from '../helpers/images/noImage.png';
import ItemAddCart from '../molecules/ItemAddCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    media: {
      maxHeight: 500,
      maxWidth: 500
    },
  }),
);

interface Details {
  item?: any,
  price?: any,
}

function ItemDetails(props: Details) {
  const classes = useStyles();
  const { item, price } = props;

  return (
    <Box mt={15} display="flex" justifyContent="center">
      { !item && <Redirect to="/" />}
      <Container fixed>
        <div className={classes.root}>

          <Grid container spacing={3}>
            <Grid item xs={12} md={1} />

            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="center">
                <img 
                  src={item?.image_url ? item.image_url : ImgDefault} 
                  className={!item?.image_url ? classes.media : ''} 
                  alt={item ? item.product_name : 'No product name'} 
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <ItemAddCart item={item} price={price} />
              </Box>
            </Grid>
            
          </Grid>

        </div>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  item: state.general.item,
  price: state.general.price,
});


const mapDispatchToProps = (dispatch: any) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);