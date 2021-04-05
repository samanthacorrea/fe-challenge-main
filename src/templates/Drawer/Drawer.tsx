import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
});

const DrawerCart = (props: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState({ right: false });
  const anchor = 'right';

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    props.setDrawerState(false);
    if (event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <div> teste </div>
    </div>
  );

  return (
    <Drawer anchor={anchor} open={state['right']} onClose={() => toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}

export default DrawerCart;