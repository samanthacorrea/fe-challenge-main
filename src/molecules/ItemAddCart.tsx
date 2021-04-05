import { Box, Typography, Divider, Grid, Button, createStyles, Theme, makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemCharacteristic from '../atoms/ItemCharacteristic';
import Util from '../helpers/lib'
import Style from '../helpers/styles/Label';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface Details {
  item?: any,
  price?: any,
  setCartItems?: any
  setTotalPurchase?: any,
  setCartItemsQuantity?: any,
}


const ItemAddCart = (props: Details) => {
  const classes = useStyles();

  const { item, price } = props;

  const updateCart = () => {
    if (item) {

      const itemObj = {
        id: item.id,
        product_name: item.product_name,
        unit_price: price,
        image_url: item.image_url,
        images: item.images,
        product_quantity: item.product_quantity,
        added_quantity: 1,
      }

      let items = JSON.parse(sessionStorage.getItem('@kitchwine/items') || '{}');
      let total = JSON.parse(sessionStorage.getItem('@kitchwine/total') || '0');

      let cartItems: any = {};

      if (Object.entries(items)?.length === 0) {
        if (itemObj.added_quantity <= item.product_quantity) { // first item on cart

          cartItems[item.id] = itemObj;

          sessionStorage.setItem('@kitchwine/items', JSON.stringify(cartItems));
          sessionStorage.setItem('@kitchwine/total', price);

          props.setCartItems(cartItems);
          props.setTotalPurchase(price);

          const itemsQuantity = Util.itemsQuantity(cartItems);
          sessionStorage.setItem('@kitchwine/quantity', String(itemsQuantity));
          props.setCartItemsQuantity(cartItems);

          return;

        } else {
          alert("Sorry, sould out!");
        }
      } else if (Object.entries(items)?.length > 0 && items[item.id]) {

        if ((items[item.id].added_quantity + 1) <= item.product_quantity) { // there is item on the list

          items[item.id].added_quantity += 1;
          total = Number(total) + Number(price);

          sessionStorage.setItem('@kitchwine/quantity', String(items[item.id].added_quantity));
          sessionStorage.setItem('@kitchwine/items', JSON.stringify(items));
          sessionStorage.setItem('@kitchwine/total', total);

          props.setCartItems(items);
          props.setTotalPurchase(total);
        } else {
          alert("Sorry, sould out!");
        }

      } else {

        if (itemObj.added_quantity <= item.product_quantity) { // new item on the list

          items[item.id] = itemObj;
          total = Number(total) + Number(price);

          sessionStorage.setItem('@kitchwine/items', JSON.stringify(items));
          sessionStorage.setItem('@kitchwine/total', total);

          props.setCartItems(items);
          props.setTotalPurchase(total);
        } else {
          alert("Sorry, sould out!");
        }
      }

      const itemsQuantity = Util.itemsQuantity(items);
      sessionStorage.setItem('@kitchwine/quantity', String(itemsQuantity));
      props.setCartItemsQuantity(items);
    }

  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        {!item && <Redirect to="/" />}
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h4" color="secondary">
              <Style.TextTransformCapitalize>{item ? item.product_name : 'No product name'}</Style.TextTransformCapitalize>
            </Typography>
            <Typography variant="h5" color="textPrimary">
              {Util.currency(price)}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider />

      <Box ml={2}>

        {/* Item details */}
        <ItemCharacteristic
          info={item && item.brands ? item.brands : null}
          title="Brands: " />

        <ItemCharacteristic
          info={item && item.quantity ? item.quantity : null}
          title="Quantity: " />

        <ItemCharacteristic
          info={item && item.manufacturing_places ? item.manufacturing_places : null}
          title="Manufacturing Places: " />

        <ItemCharacteristic
          info={item && item.stores ? item.stores : null}
          title="Stores: " />

        <ItemCharacteristic
          info={item && item.countries ? item.countries : null}
          title="Countries where sold: " />

        <ItemCharacteristic
          info={item && item.purchase_places ? item.purchase_places : null}
          title="Purchases places: " />

        <ItemCharacteristic
          info={item && item.nutriments?.alcohol && item.nutriments?.alcohol_unit ?
            (item.nutriments.alcohol + item.nutriments.alcohol_unit) : null}
          title="Alcohol: " />
        {/* Item details */}
      </Box>

      <Divider />

      {
        item.id === undefined ?
          <Box mt={3} ml={2}>
            <Typography>
              This product is not available
            </Typography>
            <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Box mt={1} ml={-1}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.button}
                >
                  See All Wines
              </Button>
              </Box>
            </Link>
          </Box>


          :
          <Box mt={1} ml={1}>
            <Button
              onClick={() => updateCart()}
              variant="contained"
              size="large"
              color="secondary"
              className={classes.button}
            >
              Add to Cart
        </Button>
          </Box>
      }


    </div>
  );
}

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = (dispatch: any) => ({
  setCartItems: (cartItems: any) => dispatch({ type: 'SET_CART_ITEMS', cartItems: cartItems }),
  setTotalPurchase: (totalPurchase: any) => dispatch({ type: 'SET_TOTAL_PURCHASE', totalPurchase: totalPurchase }),
  setCartItemsQuantity: (cartItemsQuantity: any) => dispatch({ type: 'SET_CART_ITEMS_QUANTITY', cartItemsQuantity: cartItemsQuantity }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemAddCart);