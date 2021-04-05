import { Box, Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import CartItem from '../molecules/CartItem';
import Util from '../helpers/lib';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignRight: {
      textAlign: 'right',
    },
    textAlignLeft: {
      textAlign: 'left',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface Details {
  item?: any,
  price?: any,
  setTotalPurchase?: any,
  totalPurchase?: any,
  setOrder?: any,
  cartItems?: any,
  setCartItemsQuantity?: any,
  setCartItems?: any,
}

const ShoppingCart = (props: Details) => {
  const classes = useStyles();

  let items = props.cartItems;
  items = Object.values(items);

  let total = sessionStorage.getItem('@kitchwine/total');

  const setOrder = () => {
    const order = {
      items: items,
      total: total,
    }

    sessionStorage.setItem('@kitchwine/order', JSON.stringify(order));
    props.setOrder(order);
  }

  const removeItem = (item: any) => {

    let id = item.id;
    let items = props.cartItems;
    let total = JSON.parse(sessionStorage.getItem('@kitchwine/total') || '0');
    let quantity = JSON.parse(sessionStorage.getItem('@kitchwine/quantity') || '0');

    total -= (Number(items[id].unit_price) * Number(items[id].added_quantity));
    quantity -= Number(items[id].added_quantity);

    if (total > 0) {
      sessionStorage.setItem('@kitchwine/total', total);
    } else {
      total = 0
      sessionStorage.setItem('@kitchwine/total', total);
    }

    sessionStorage.setItem('@kitchwine/quantity', quantity);

    const updatedItems = Util.remove(items, item.id);
    sessionStorage.setItem('@kitchwine/items', JSON.stringify(updatedItems));
    props.setCartItems(updatedItems);
    props.setTotalPurchase(total);
    props.setCartItemsQuantity(items);
  }

  const handleChangeValue = (event: any, item: any) => {
    let items_ = props.cartItems;
    items_[item.id].added_quantity = Number(event.target.value);
    props.setCartItems(items_);
  }

  useEffect(() => {
    props.setTotalPurchase(total);
  }, [props.totalPurchase]);

  return (
    <Box mt={8}>
      <Container fixed className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography gutterBottom variant="h4" color="secondary">
                Your Wine Basket
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>

        <Grid container >
          {
            items.length === 0 &&
            <Container fixed>
              <Box mt={10} className={classes.textAlignCenter}>

                <Box mb={4}>
                  <Typography variant="h5">
                    Your shopping cart is currently empty.
                  </Typography>
                </Box>

                <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                  <Button variant="contained" size="large" color="secondary" >
                    See all wines
                  </Button>
                </Link>

              </Box>
            </Container>
          }

          {/* List items */}
          {
            items?.map((item: any, index: any) => (
              <>

                <Grid md={2} />
                <Grid item md={8} key={index}>
                  <CartItem item={item} removeItem={removeItem} handleChangeValue={handleChangeValue} />
                  <Box mt={3}>
                    <Divider />
                  </Box>
                </Grid>
                <Grid md={2} />
              </>

            ))
          }
          {/* List items */}

        </Grid>
        {
          items.length !== 0 &&
          <Box>
            <Box mt={5}>
              <Grid md={10}>
                <Typography color="textPrimary" variant="h6" align="right">
                  <b>Total:</b> {Util.currency(total)}
                </Typography>
              </Grid>
            </Box>

            <div className={classes.root}>
              <Grid container spacing={3}>

                {/* Back to Shopping button*/}

                <Grid item xs={6} className={classes.textAlignRight}>
                  <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      color="secondary"

                    >
                      Shopping
                  </Button>
                  </Link>
                </Grid>
                {/* Back to Shopping button */}

                {/* Go to Order button (Checkout) */}
                <Grid item xs={6}>
                  <Link to={`/checkout`} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={() => setOrder()}
                      variant="contained"
                      size="large"
                      color="secondary"
                    >
                      Order
                    </Button>
                  </Link>
                </Grid>
                {/* Go to Order button (Checkout) */}

              </Grid>
            </div>
          </Box>

        }

      </Container>
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  totalPurchase: state.general.totalPurchase,
  cartItems: state.general.cartItems,

});


const mapDispatchToProps = (dispatch: any) => ({
  setItem: (item: any, price: any) => dispatch({ type: 'SET_ITEM', item: item, price: price }),
  setOrder: (order: any) => dispatch({ type: 'SET_ORDER', order: order }),
  setCartItems: (cartItems: any) => dispatch({ type: 'SET_CART_ITEMS', cartItems: cartItems }),
  setTotalPurchase: (totalPurchase: any) => dispatch({ type: 'SET_TOTAL_PURCHASE', totalPurchase: totalPurchase }),
  setCartItemsQuantity: (cartItemsQuantity: any) => dispatch({ type: 'SET_CART_ITEMS_QUANTITY', cartItemsQuantity: cartItemsQuantity }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);


