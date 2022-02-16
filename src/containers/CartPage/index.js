import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart,getCartItems } from "../../actions";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import PriceDetails from "../../components/PriceDetails";



const CartPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const [cartItems,setCartItems]= useState(cart.cartItems)

  useEffect(()=>{
    setCartItems(cart.cartItems)
  },[cart.cartItems,dispatch])

  useEffect(()=>{
     if(auth.authenticate){
       dispatch(getCartItems())
     }
  },[auth.authenticate, dispatch])

const onQuantityIncrement = (_id,qty) => {
  // console.log({_id,qty});
  const {name,price,img} =cartItems[_id];
  dispatch(addToCart({_id, name, price, img},1));

}

const onQuantityDecrement = (_id,qty) => {
     // console.log({_id,qty});
  const {name,price,img} =cartItems[_id];
  dispatch(addToCart({_id, name, price, img},-1));
}

// if (props.onlyCartItems) {
//   return (
//     <>
//       {Object.keys(cartItems).map((key, index) => (
//         <CartItem
//           key={index}
//           cartItem={cartItems[key]}
//           onQuantityInc={onQuantityIncrement}
//           onQuantityDec={onQuantityDecrement}
//         />
//       ))}
//     </>
//   );
// }


  return (
    <Layout>
      <div className="cartContainer" style={{alignItems:'flex-start'}}>
        <Card 
           headerLeft={`My Cart`}
           headerRight={<div>Deliver To</div>}
           style={{width:'calc(100% - 400px',overflow:'hidden'}}
           >

          {
            Object.keys(cartItems).map((key, index) => (
            <CartItem 
              key={index} 
              cartItem={cartItems[key]} 
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}
          <div 
             style={{
               width: '100%',
               display: 'flex',
               background: '#ffffff',
               justifyContent: 'flex-end',
               boxShadow: '0 0 10px 10px #eee',
               padding: '10px 0',
               boxSizing:'border-box'
             }}
           >
            <div style={{width: '250px'}}>
              <MaterialButton
               title='Place Order'
               onClick={()=>props.history.push(`/checkout`)}
              />
            </div>
          </div>
        </Card>
         <PriceDetails
           totalItem={ 
             Object.keys(cart.cartItems).reduce((qty,key)=>{
                return qty + cart.cartItems[key].qty;
              },0)
           }
           totalPrice={
            Object.keys(cart.cartItems).reduce((totalPrice,key)=>{
              const {price,qty}=cart.cartItems[key]
              return totalPrice + price * qty;
             },0)
           }
         />
     
      </div>
    </Layout>
  );
};

export default CartPage;
