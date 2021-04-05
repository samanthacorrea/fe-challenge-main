import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImgDefault from '../helpers/images/noImage.png';
import Style from '../helpers/styles/Label';
import Util from '../helpers/lib'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: 350,
      maxHeight: 350,
    }
  }),
);

const Item = (props: any) => {
  const classes = useStyles();


  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [price, setPrice] = useState<any>(null);

  const { item } = props;
  
  const getImageSize = () => {
    const itemImg = item.images;
    const imageUrl = item.image_url;

    if (itemImg && imageUrl) {
      if (itemImg.front_pt) {
        setWidth(itemImg.front_pt.sizes[200].w);
        setHeight(itemImg.front_pt.sizes[200].h);
      } else if (itemImg.front_fr) {
        setWidth(itemImg.front_fr.sizes[200].w);
        setHeight(itemImg.front_fr.sizes[200].h);
      } else if (itemImg.front_de) {
        setWidth(itemImg.front_de.sizes[200].w);
        setHeight(itemImg.front_de.sizes[200].h);
      } else if (itemImg.front_en) {
        setWidth(itemImg.front_en.sizes[200].w);
        setHeight(itemImg.front_en.sizes[200].h);
      } else if (itemImg.front_es) {
        setWidth(itemImg.front_es.sizes[200].w);
        setHeight(itemImg.front_es.sizes[200].h);
      } else if (itemImg.front_it) {
        setWidth(itemImg.front_it.sizes[200].w);
        setHeight(itemImg.front_it.sizes[200].h);
      } else {
        setWidth("200");
        setHeight("200");
      }
    } else {
      setWidth("200");
      setHeight("200");
    }
  }

  const generatePrice = (productName: string) => {
    let value = 0;

    if (productName) {
      value = productName.charCodeAt(0);
    } else {
      let str = "eatkitch";
      value = str.charCodeAt(0);
    }

    let hash = Math.ceil(value / 7);
    setPrice(hash);
    return hash;
  }

  useEffect(() => {
    if (item) {
      getImageSize();
      generatePrice(item.product_name);
    }
  }, []);

  return (
    <Link to={`/wine-details`} style={{ textDecoration: 'none' }} onClick={() => props.setItem(item, price)}>
      <Card className={classes.root}>
        <CardActionArea>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">

            <img src={item?.image_url ? item.image_url : ImgDefault} width={width} height={height} alt={item ? item.product_name : 'No product name'} />

          </Box>
          <CardContent>
            <Typography gutterBottom variant="h6" color="secondary">
              <div style={{ whiteSpace: 'nowrap' }}>
                <Box component="div"
                  textAlign="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  bgcolor="background.paper"
                >
                  <Style.TextTransformCapitalize>{item ? item.product_name : 'No product name'}</Style.TextTransformCapitalize>
                </Box>
              </div>
            </Typography>
            <Typography variant="h6" color="textPrimary" align="center">
              {item ? Util.currency(price) : '0.0 €'}
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = (dispatch: any) => ({
  setItem: (item: any, price: any) => dispatch({ type: 'SET_ITEM', item: item, price: price }),
});



export default connect(mapStateToProps, mapDispatchToProps)(Item);