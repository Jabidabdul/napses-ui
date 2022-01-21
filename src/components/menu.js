import React from 'react'
import axios from 'axios'
import {useNavigate, Link, } from 'react-router-dom'
import { useContext } from 'react'
import { AmountContext } from '../context/totalAmount'

export const Menu = () => {
    const [totalAmount,setTotalAmount,totalItems,setTotalItems ] = useContext(AmountContext)
    const [productData, setProductData] = React.useState([]);
    const [product, setProduct] = React.useState({}); 

    React.useEffect(()=>{
        var data = '';
        var config = {
          method: 'get',
          url: process.env.REACT_APP_PRODUCT_API,
          headers: { },
          data : data
        };
        axios(config)
        .then(function (response) {
        //   console.log(JSON.stringify(response.data));
        setProductData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },[])
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
        setProduct(response.data.cart_list)
      })
      .catch(function (error) {
      console.log(error);
      });

  },[])
    const amount=(...items)=>{
      let totalPrice = 0;
      for(let i=0; i<items.length; i++){
          console.log(items[i].price_for_quantity)
          totalPrice+=items[i].price_for_quantity;
      }
      return totalPrice;
    }
    React.useEffect(async()=>{
      console.log(product)
            const getAmount= await amount(...product);
            setTotalAmount(getAmount)
            setTotalItems(product.length)
    },[product])

    const handleAddItem=(item)=>{
        const {id, price, title, image } = item;
        console.log(id, price, title, image )
        var data = JSON.stringify({
            "prodId": id,
            "title": title,
            "price": price,
            "image": image
          });
          var config = {
            method: 'post',
            url: process.env.REACT_APP_ADDITEM_API,
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : data
          };
          axios(config)
          .then(function (response) {
            console.log((response.data.cart_list));
            setProduct(response.data.cart_list)
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return (
        <div>

             <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap',justifyContent:'center', alignItems:'center'}}>
                {Object.entries(productData).map((item,i)=>{
                    return(
                        <div className="card"style={{height:'350px',width:'300px', margin:'10px'}} >
                             <div style={{marginTop:'20px',display:'flex', flexDirection:'column', 
                          justifyContent:'center', alignItems:'center', align:'center'}} >
                                        <h9 style={{textAlign:'center'}}><span>{(item[1].title.length >= 30) ? item[1].title.slice(0,30)+"..." : item[1].title}</span></h9>
                                        <img src={item[1].image} alt="cloths" height="160px" width="140px" style={{margin:'20px'}}/>
                                        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
                                            <div>
                                                <p><span>Price : {item[1].price}</span></p><button onClick={()=>handleAddItem(item[1])}
                                                class="btn btn-info" style={{width:"100px", fontSize:'10px'}}>Add to Cart</button>
                                            </div>
                                            <div>
                                                <p><span>Rating : {item[1].rating.rate}</span></p><button 
                                                
                                                class="btn btn-success" style={{width:"100px", fontSize:'10px'}}>Buy Now</button>
                                            </div>    
                                        </div>
                            </div>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}
