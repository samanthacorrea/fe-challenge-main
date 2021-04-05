import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Badge, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Util from '../../helpers/lib'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: 800
    },
    offset: theme.mixins.toolbar,
  }),
);

const logoStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(),
      },
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      right: '8px',
    },

  }),
);

interface Details {
  setTotalPurchase?: any,
  setCartItemsQuantity?: any,
  totalPurchase?: any,
  cartItemsQuantity?: any,
}

const KitchAppBar = (props: Details) => {
  const classes = useStyles();
  const logo = logoStyle();

  let total = parseInt(sessionStorage.getItem('@kitchwine/total') || '0');
  let quantity = parseInt(sessionStorage.getItem('@kitchwine/quantity') || '0');

  useEffect(() => {
    props.setTotalPurchase(total);
    props.setCartItemsQuantity(quantity);
  }, [props.totalPurchase, props.cartItemsQuantity]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link to={"/"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Avatar alt="Kitch" src="/logo.jpeg" className={logo.small} />
          </Link>
          <Typography variant="h6" className={classes.title}>
            Kitch Wine Market
            </Typography>
          <Typography variant="h6">
            {props.totalPurchase > 0 ? Util.currency(props.totalPurchase) : '0,00'}
          </Typography>

          <Link to={"/cart"} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <IconButton color="inherit">
              <Badge badgeContent={props.cartItemsQuantity > 0 ? props.cartItemsQuantity : '0'} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}


const mapStateToProps = (state: any) => ({
  totalPurchase: state.general.totalPurchase,
  cartItemsQuantity: state.general.cartItemsQuantity,
});


const mapDispatchToProps = (dispatch: any) => ({
  setItem: (item: any, price: any) => dispatch({ type: 'SET_ITEM', item: item, price: price }),
  setCartItems: (cartItems: any) => dispatch({ type: 'SET_CART_ITEMS', cartItems: cartItems }),
  setTotalPurchase: (totalPurchase: any) => dispatch({ type: 'SET_TOTAL_PURCHASE', totalPurchase: totalPurchase }),
  setCartItemsQuantity: (cartItemsQuantity: any) => dispatch({ type: 'SET_CART_ITEMS_QUANTITY', cartItemsQuantity: cartItemsQuantity }),
});


export default connect(mapStateToProps, mapDispatchToProps)(KitchAppBar);