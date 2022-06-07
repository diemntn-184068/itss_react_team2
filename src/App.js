import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Basket from './components/Basket';
import data from './data';
import Main from './components/Main';
import { useState } from 'react';
import useStorage from './hooks/storage';
function App() {
  const { products } = data;
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, putCartItems, clearCartItems] = useStorage();
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      putCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      putCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      putCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      putCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const onClear = () => {
    clearCartItems();
  }
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onClear={onClear}
        ></Basket>
      </div>
    </div>
  );
}


export default App;
