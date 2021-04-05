const currency = (value: any) => {
	return parseFloat(value).toLocaleString('pt-PT', { minimumFractionDigits: 2 }) + ' €';
}

const itemsQuantity = (items: any) => {
	let itemsTotal = 0;
	for (let item in items) {
		itemsTotal += items[item].added_quantity;
	}
	return itemsTotal;
}

const remove = (arr: any, value: any) => {
	let result = Object.entries(arr).filter(function (item: any) {
		return item[0] !== value;
	});
	return Object.fromEntries(result);
}

const isEmpty = (obj : any) => {
	return Object.keys(obj).length === 0;
}

const util = {
	currency,
	itemsQuantity,
	remove,
	isEmpty,
}


export default util;