import React,{useEffect,useMemo, useState, useReducer} from 'react';
import items from './products/products';
const reducer=(state,product)=>{
  return [...state, product]
}
export default function Shop(){

    const[products,setProducts]=useState(items);
    const[total,setTotal]=useState({ttl:0,disc:0});
    const[checkout,setList]=useReducer(reducer,[]);

    const addProduct=(el)=>{
      const cost = Number(el.price);
      console.log(el)
      let finalCost = Number(total.ttl+cost).toFixed(2);
      setTotal({...total,ttl:Number(finalCost)});
      setList(el.code);      
    }
  
    useEffect(()=>{
      let discount=0;
      products.forEach((elm,i)=>{
        const check = checkout.filter(el=>el===elm.code);
        const checkVGA = checkout.filter(el=>el==='vga');
        switch (elm.code) {
          case 'ipd':
            if(check.length>4){
              discount+=check.length*50
            } 
            break;
          case 'atv':
            if(check.length%3>=0){
              discount+=(Math.floor(check.length/3)*elm.price)
            } 
            break;
          case 'mbp':
            const vgaItem=products.filter(el=>el.code==='vga')
            if(checkVGA.length>=check.length){
              discount+=check.length*vgaItem[0].price
            }
            else if(check.length>0){
              setTimeout(()=>{
                addProduct(...vgaItem);
              },100)
            }
            break;
        
          default:
            break;
        }
      })
      console.log(discount);
      setTotal({...total,disc:discount});
      
    },[checkout])
  
    //useMemo to re-render only when products (parameter) change
    return useMemo(()=>{
      return( <div className='product-list'>
        <div className='row'>
        <div className='products price'>Products : </div>
        <div className='price'>{(checkout).map((el)=>`${el} `)}</div>
        </div>
        <div className='row'>
        <div className='total price'>Total : </div>
        <div className='price'>{total.ttl}</div>
        </div>
        <div className='row'>
        <div className='Discount price'>Discount : </div>
        <div className='price'>{total.disc}</div>
        </div>
        <div className='row'>
        <div className='total price'>Final : </div>
        <div className='price'>{total.ttl-total.disc}</div>
        </div>
        {(products.length > 0)?
          products.map((el,i)=>{
            
            return (<div key={i} className=''>
                      <div className='row'>
                        <button className='product' onClick={()=>addProduct(el)}>{el.name}</button>
                        <div className='price'>{el.price}</div>
                        
                      </div>
                    </div>)
          })
        :null}
       
      </div>)
    },[total])
    
    
}