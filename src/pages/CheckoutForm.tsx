
import {
    Box, Button, Container, Divider, FormControl,
    FormControlLabel, Grid, Radio, RadioGroup, TextField,
    Typography
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemOrder from '../molecules/ItemOrder';
import Util from '../helpers/lib'

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
        textAlignCenter: {
            textAlign: 'center',
        },
        textAlignRight: {
            textAlign: 'right',
        },
        textAlignLeft: {
            textAlign: 'left',
        },
    }),
);

interface Order {
    setTotalPurchase?: any,
    setCartItemsQuantity?: any,
    setCartItems?: any,
}

const Checkout = (props: Order) => {
    const classes = useStyles();

    const order = JSON.parse(sessionStorage.getItem('@kitchwine/order') || '{}');

    const [creditCard, setCreditCard] = useState('disapproved');
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [redirect, setRedirect] = useState(false);

    const handleChangeName = (event: any) => {
        const value = event.target.value;
        setName(value);
    };

    const handleChangeLastName = (event: any) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handleChangeEmail = (event: any) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handleChangeAddress = (event: any) => {
        const value = event.target.value;
        setAddress(value);
    };

    const handleChangeCredidCard = (event: any) => {
        setCreditCard(event.target.value);
    };

    const finishOrder = () => {
        if (creditCard !== 'disapproved') {
            alert("Your order has been approved! Thank you")

            sessionStorage.removeItem('@kitchwine/items');
            sessionStorage.removeItem('@kitchwine/total');
            sessionStorage.removeItem('@kitchwine/quantity');
            sessionStorage.removeItem('@kitchwine/order');
            props.setTotalPurchase(0);
            props.setCartItems(0);
            props.setCartItemsQuantity(0);

            setRedirect(true);

        } else {
            window.confirm("Credit card is invalid! You may change to finish it ;)");
        }
    }

    const checkForm = () => (name.length < 1 || lastName.length < 1 || email.length < 1 || address.length < 1);
    

    return (

        <Box mt={8}>
            {(Util.isEmpty(order) || redirect) && <Redirect to="/" />}
            <Container fixed className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={2}/>

                    {/* Header */}
                    <Grid item xs={8}>
                        <Box mt={2}>
                            <Typography gutterBottom variant="h4" color="secondary" className={classes.textAlignCenter}>
                                Order Review
                            </Typography>
                            <Box mt={6} mb={3}>
                                <Typography gutterBottom variant="h5" color="textSecondary" className={classes.textAlignCenter}>
                                    Personal Information
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {/* Header */}
                    <Grid item xs={2}/>
                </Grid>

                {
                    order?.items?.length !== 0 &&
                    <Box mb={10}>

                        <Grid container spacing={3}>

                            {/* Form - Personal Information */}
                            <Grid sm={3} />
                            <Grid item xs={12} md={3} className={classes.textAlignRight}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeName(e)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} className={classes.textAlignLeft}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeLastName(e)}
                                />
                            </Grid>
                            <Grid sm={3} />
                            <Grid sm={3} />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeEmail(e)}
                                />
                            </Grid>
                            <Grid sm={3} />
                            <Grid sm={3} />
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleChangeAddress(e)}
                                />
                            </Grid>
                            {/* Form - Personal Information */}

                            {/* List orders items */}
                            <Grid container spacing={3}>
                                <Grid item xs={2}/>
                                
                                <Grid item xs={8}>
                                    <Box mt={4}>
                                        <Typography gutterBottom variant="h5" color="textSecondary" className={classes.textAlignCenter}>
                                            Items
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}/>
                            </Grid>

                            <Grid sm={3} />

                            <Grid xs={12} md={6}>
                                {order.items?.map((item: any, index: any) => (
                                    <Box key={index}>
                                        <ItemOrder item={item} />
                                        <Divider />
                                    </Box>
                                ))}

                            </Grid>

                            <Grid sm={3} />
                            {/* List orders items */}


                            {/* Payment */}
                            <Grid container spacing={3}>
                                <Grid xs={2} />
                                <Grid item xs={8}>
                                    <Box mt={4}>
                                        <Typography gutterBottom variant="h5" color="textSecondary" className={classes.textAlignCenter}>
                                            Payment
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2} />
                            </Grid>

                            <Grid sm={3} />

                            <Grid>
                                <Box mb={4}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="creditCard"
                                            name="creditCard"
                                            value={creditCard ? creditCard : " "}
                                            onChange={(e) => handleChangeCredidCard(e)}
                                        >
                                            <FormControlLabel
                                                value={"disapproved"}
                                                control={<Radio color="secondary" />}
                                                label="**** **** **** 8520 (07/2019)"
                                            />
                                            <FormControlLabel
                                                value={"approved"}
                                                control={<Radio color="secondary" />}
                                                label="**** **** **** 7765 (09/2022)"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* Payment */}

                            <Grid sm={3} />

                            {/* Back to Shopping Cart button*/}
                            <Grid item xs={6} className={classes.textAlignRight}>
                                <Link to={`/cart`} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                    >
                                        Shopping Cart
                                    </Button>
                                </Link>
                            </Grid>
                            {/* Back to Shopping Cart button*/}

                            {/* Go to Finish Order button*/}
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => finishOrder()}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    disabled={checkForm()}
                                >
                                    Finish Order
                                </Button>
                            </Grid>
                            {/* Go to Finish Order button*/}
                        </Grid>
                    </Box>
                }
            </Container>
        </Box>
    );
}

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = (dispatch: any) => ({
    setCartItems: (cartItems: any) => dispatch({ type: 'SET_CART_ITEMS', cartItems: cartItems }),
    setTotalPurchase: (totalPurchase: any) => dispatch({ type: 'SET_TOTAL_PURCHASE', totalPurchase: totalPurchase }),
    setCartItemsQuantity: (cartItemsQuantity: any) => dispatch({ type: 'SET_CART_ITEMS_QUANTITY', cartItemsQuantity: cartItemsQuantity }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);



