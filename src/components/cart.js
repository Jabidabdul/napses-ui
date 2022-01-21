import React from 'react'
import axios from 'axios'
import './cart.css'
import { useContext } from 'react'
import { AmountContext } from '../context/totalAmount'

export const Cart = () => {
    const [cartItem, setCartItem] = React.useState([]);
    const [totalAmount,setTotalAmount,totalItems,setTotalItems ] = useContext(AmountContext)

    React.useEffect(()=>{
        var data = ''
        var config = {
        method: 'get',
        url: process.env.REACT_APP_GETITEM_API,
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
        };
        axios(config)
        .then(function (response) {
        setCartItem(response.data.cart_list)
        })
        .catch(function (error) {
        console.log(error);
        });

    },[])
    const amount=(...items)=>{
        // console.log(items)
        let totalPrice = 0;
        for(let i=0; i<items.length; i++){
            console.log(items[i].price_for_quantity)
            totalPrice+=items[i].price_for_quantity;
        }
        return totalPrice;
    }
    React.useEffect(async()=>{
            const getAmount= await amount(...cartItem);
            setTotalAmount(getAmount)
            setTotalItems(cartItem.length)
    },[cartItem])
    
    const handleQuantity=(operation,id)=>{
        var data = JSON.stringify({
        "deleteitem": id,
        "whole_item": operation
        });
        console.log(data)
        var config = {
        method: 'post',
        url: process.env.REACT_APP_DELETE_API,
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
        };
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCartItem(response.data.cart_list)
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        <div style={{ width:'100%', height:'100vh',display:'flex',
        alignItems:'center', flexDirection:'column'}}>
           {cartItem && 
               cartItem.map(prod=>{
                   return <div className ="card" key={prod.id_of_item} style={{display:'flex',width:"40%",alignItems:'center',
                    flexDirection:'row', justifyContent:'space-between', marginTop:'20px'}}>
                                <img src={prod.item_image} alt="cloths" width="100px" height="100px" />   
                                <div style={{width:'', marginLeft:"10px"}}>
                                    <h9 style={{textAlign:'center'}}><span>{(prod.title_id.length >= 30) ? prod.title_id.slice(0,30)+"..." : prod.title_id}</span></h9>
                                    <p>Price: {prod.price_per_item}</p>
                                    <p>Quantity Price : {parseFloat(prod.price_for_quantity,10).toFixed(2)}</p>
                                </div>
                                <div style={{width:'', marginLeft:"10px"}}>
                                    <div style={{display:'flex', height:'40px',width:''}}>
                                        <button className="btn btn-primary" 
                                        onClick={()=>handleQuantity(1,prod.id_of_item)} style={{margin:"",width:''}}>+</button>
                                        <p style={{textAlign:'center', height:'40px',width:'40px',margin:'10px'}}>{prod.item_quanitity}</p>
                                        <button className="btn btn-secondary" style={{margin:'' ,width:'',textAlign:'center'}}
                                        onClick={()=>handleQuantity(0,prod.id_of_item)} >-</button>
                                    </div>
                                    <button className="btn btn-danger" onClick={()=>handleQuantity(-1,prod.id_of_item)} 
                                        style={{marginTop:'20px',width:'100%'}}>Delete</button>
                                </div>
                            
                   </div>
               })}
               <h3 style={{margin:'30px'}}>Total Amount :{parseFloat(totalAmount,10).toFixed(2)}</h3>
        </div>
    )
}
