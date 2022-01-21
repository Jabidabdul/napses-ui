import React from 'react'
import {Routes,Link, Route, BrowserRouter} from 'react-router-dom'
import { Cart } from './components/cart'
import { Menu } from './components/menu'
import { useContext } from 'react'
import { AmountContext } from './context/totalAmount'
const RoutePages = () => {

    const [totalAmount,setTotalAmount,totalItems,setTotalItems ] = useContext(AmountContext)
    console.log(totalAmount)
    return (
        <div>
            <div style={{display:'flex', flexDirection:'row', width:'100%',height:'50px', justifyContent:'center', alignItems:'center'}}>
                    <Link to='/menu' style={{margin:'5px'}}>Product</Link>
                    <Link to='/cart'style={{margin:'5px'}}>
                        <i class="fas fa-shopping-cart" style={{ width:'30px', height:'30px'}}>
                            </i>Cart
                    </Link>
                    <h8 style={{margin:'3px'}}>Total Amount : {parseFloat(totalAmount,10).toFixed(2)}</h8>
                    <h8 style={{margin:'3px'}}>Items : {totalItems}</h8>   
            </div>
            <Routes>
            <Route path='/cart' element ={<Cart/>} />
                <Route path='/menu' element ={<Menu/>} />
            </Routes>
        </div>
    )
}
export default RoutePages
