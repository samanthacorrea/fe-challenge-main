import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { Store } from './redux/store/Index';
import Header from './templates/Header/Header';
import Home from './pages/Home';
import Cart from './pages/ShoppingCart';
import NotFound from './pages/NotFound';
import ItemDetails from './pages/ItemDetails';
import CheckoutForm from './pages/CheckoutForm';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={Store}>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/wine-details" exact component={ItemDetails} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={CheckoutForm} />
          <Route component={NotFound} />
        </Switch>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

