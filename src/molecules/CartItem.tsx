import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { useState } from "react";
import Util from '../helpers/lib';
import ImgDefault from '../helpers/images/noImage.png';
import Style from '../helpers/styles/Label';


interface Details {
	item?: any,
	cartItems?: any,
	setCartItemsQuantity?: any,
	setCartItems?: any,
	setTotalPurchase?: any,	
	removeItem?: any,
	handleChangeValue?: any,
	totalPurchase?: any,
}

const CartItem = (props: Details) => {

	const { item } = props;

	const [value, setValue] = useState<Number>(item.added_quantity);

	const handleChange = (event: any) => {
		if (event.target.value > 0 || event.target.value === '') {
			setValue(event.target.value);
			props.handleChangeValue(event, item);
		}
	}

	const setItemQuantity = () => {
		if (Number(value) < 1) {
			alert("The item quantity must be bigger than 0");
			return;
		}
		if (Number(value) <= Number(item.product_quantity)) {
			let id = item.id;
			let items = JSON.parse(sessionStorage.getItem('@kitchwine/items') || '{}');
			let total = JSON.parse(sessionStorage.getItem('@kitchwine/total') || '0');
			let quantity = JSON.parse(sessionStorage.getItem('@kitchwine/quantity') || '0');

			props.setCartItemsQuantity(items);

			let oldItemTotal = Number(items[id].added_quantity) * Number(items[id].unit_price);
			let oldQuantity = Number(items[id].added_quantity);
			items[id].added_quantity = Number(value);

			sessionStorage.setItem('@kitchwine/items', JSON.stringify(items));
			props.setCartItems(items);

			let newItemTotal = Number(items[id].unit_price) * Number(value);
			let newQuantity = items[id].added_quantity;

			quantity = (Number(quantity) - Number(oldQuantity)) + Number(newQuantity);
			total = (total - oldItemTotal) + newItemTotal;

			sessionStorage.setItem('@kitchwine/total', total);
			sessionStorage.setItem('@kitchwine/quantity', quantity);

			props.setTotalPurchase(total);
			props.setCartItemsQuantity(items);
		} else {
			alert("Quantity not available! Please, try a lower quantity.")
		}
	}

	return (
		<Box mt={8}>
			<Grid container>
				<Grid md={1}>
					<img src={item?.image_url ? item.image_url : ImgDefault} width={"34"} height={"100"}
						alt={item ? item.product_name : 'No product name'} />
				</Grid>

				<Grid md={9}>
					<Typography color="textPrimary" variant="h6">
						<Style.TextTransformCapitalize>{item?.product_name}</Style.TextTransformCapitalize>
					</Typography>

					<Box display="flex" alignItems="center" p={1} m={1}
					> 
						<Box ml={-1}>
							<Grid md={12} container>

								<Grid md={3}>
									<Box mt={-1}>
										<TextField
											id={"standard-number"}
											label="Quantity"
											value={item.added_quantity}
											onChange={(e) => handleChange(e)}
											type="number"
											InputLabelProps={{
												shrink: true,
											}}
											margin="normal"
										/>
									</Box>
								</Grid>

								<Grid>
									<Box mt={2} ml={2}>
										<Button
											onClick={() => setItemQuantity()}
											variant="contained"
										>
											update
                    					</Button>
									</Box>
								</Grid>

								<Grid>
									<Box mt={2} ml={2}>
										<Button
											onClick={() => props.removeItem(item)}
											variant="contained"
										>
											remove
                    </Button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>

				<Grid md={2}>
					<Typography variant="h6" align="right">{Util.currency(item?.unit_price)}</Typography>
				</Grid>

				<Divider variant="inset" />

			</Grid>

		</Box>

	);
}

const mapStateToProps = (state: any) => ({
	cartItems: state.general.cartItems,
	totalPurchase: state.general.totalPurchase,
});


const mapDispatchToProps = (dispatch: any) => ({
	setItem: (item: any, price: any) => dispatch({ type: 'SET_ITEM', item: item, price: price }),
	setCartItems: (cartItems: any) => dispatch({ type: 'SET_CART_ITEMS', cartItems: cartItems }),
	setTotalPurchase: (totalPurchase: any) => dispatch({ type: 'SET_TOTAL_PURCHASE', totalPurchase: totalPurchase }),
	setCartItemsQuantity: (cartItemsQuantity: any) => dispatch({ type: 'SET_CART_ITEMS_QUANTITY', cartItemsQuantity: cartItemsQuantity }),
});


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);