const initialState = {
    totalPurchase: parseFloat(sessionStorage.getItem('@kitchwine/total') || '0'),
    cartItems: JSON.parse(sessionStorage.getItem('@kitchwine/items') || '{}'),
    cartItemsQuantity: parseInt(sessionStorage.getItem('@kitchwine/quantity') || '0'),
    info: null,
};

export const GeneralReducer = (state = initialState, action : any) => {

    // Immutability
    state = Object.assign({}, state);

    switch (action.type) {      
        case 'SET_INFO':
            return { ...state, info: action.info }
        case 'SET_ITEM':
            return { ...state, item: action.item, price: action.price }
        case 'SET_ORDER':
            return { ...state, order: action.order }
        case 'SET_CART_ITEMS':
            return { ...state, cartItems: action.cartItems }
        case 'SET_TOTAL_PURCHASE':
            return { ...state, totalPurchase: action.totalPurchase }
        case 'SET_CART_ITEMS_QUANTITY':
            return { ...state, cartItemsQuantity: action.cartItemsQuantity }
        default:
            return { ...state }
    }
    
}




