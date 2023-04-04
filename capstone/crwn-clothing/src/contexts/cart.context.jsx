import { createContext,useState } from "react";

const addCartItem=(cartItems,productToAdd)=>{
    const existingCartItem=cartItems.find((cartItem)=>cartItem.id==productToAdd.id);//finding

    if(existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id==productToAdd.id ? {...cartItem, quantity:cartItem.quantity+1} : cartItem
        );
    }//increament

    return [...cartItems, {...productToAdd,quantity:1}]//new product
}

export const CartContext=createContext({
    isCartOpen : false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemCart:()=>{}
})
export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen]=useState(false);
    const [cartItems, setCartItems]=useState([]);

    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const value={isCartOpen, setIsCartOpen,addItemToCart,cartItems};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
