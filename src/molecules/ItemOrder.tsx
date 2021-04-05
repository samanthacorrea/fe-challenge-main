import { List, ListItem, createStyles, Theme, makeStyles } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Util from '../helpers/lib';
import Style from '../helpers/styles/Label';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
    }
  }),
);

interface Item {
  item?: any,
}

const ItemOrder = (props: Item) => {
  const classes = useStyles();

  const { item } = props;

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText
          primary={<Style.TextTransformCapitalize>
            {item ? item.product_name : 'No product name'}
          </Style.TextTransformCapitalize>}
          secondary={"Quantity: " + item.added_quantity + " | Price: " + Util.currency(item.unit_price)} />
      </ListItem>
    </List>
  );
}

export default ItemOrder;