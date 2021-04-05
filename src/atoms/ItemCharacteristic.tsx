import { Box } from "@material-ui/core";

const ItemCharacteristic = (props: any) => {

	const { info, title } = props;

	return (
		<>
			{
				info &&
				<Box mt={2} mb={2}>
					<Box fontWeight="500" display="inline">{title}</Box>
					{info}
				</Box>
			}
		</>
	);
}

export default ItemCharacteristic;
