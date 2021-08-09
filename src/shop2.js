import React,{useEffect,useMemo, useState} from 'react';
import items from './products/products';

export default function Shop(){

    const[products]=useState(items);
    const[total,setTotal]=useState({ttl:0,disc:0});
    const[checkout,setList]=useState([]);
    const [cart,setCart]=useState({});
    const [lastItem,setLast]=useState('');

    const addProduct=(el)=>{
        const cost = Number(el.price);
        let finalCost = Number(total.ttl+cost).toFixed(2);
        setTotal({...total,ttl:Number(finalCost)});
        setLast(el.code);
        let item={};
        item[el.code] = {count:(cart[el.code])?(cart[el.code].count)+1:1};
        item[el.code].price=el.price;
        item[el.code].disc=0
        setCart({...cart,...item});
    }
  
    useEffect(()=>{    
        let item={...cart};
        switch (lastItem) {
          case 'ipd':
            if(cart.ipd.count>4){
                item['ipd'].disc=cart.ipd.count*50
                setCart({...cart,...item});
            } 
            break;
          case 'atv':
            if(cart.atv.count%3>=0){
                item['atv'].disc=Math.floor(cart.atv.count/3)*cart.atv.price;
                setCart({...cart,...item});
            } 
            break;
          case 'mbp':
            const vgaItem=products.filter(el=>el.code==='vga')
            if(cart.vga){
                item['vga'].disc=cart.mbp.count*vgaItem[0].price
                setCart({...cart,...item});
            }
            else if(cart.mbp.count>0){
                setTimeout(()=>{addProduct(...vgaItem)},100)
                
            }
            break;
          case 'vga':
                if(cart.mbp){
                item['vga'].disc=cart.mbp.count*cart.vga.price
                setCart({...cart,...item});
            }
            
            break;
        
          default:
            break;
        }
      
      let discounts=0;
      let cartItems='';
       if(Object.keys(cart).length>0)
        for(let ele in cart){
            let item = cart[ele];
                discounts+=item.disc;
            cartItems+=` ${ele}:${cart[ele].count} `    
        }
        setList(cartItems);
        setLast('');    
        setTotal({...total,disc:discounts});
    },[cart])

   
  
    //useMemo to re-render only when products (parameter) change
    return (
      <div className='product-list'>
        <div className='row'>
        <div className='total price'>Products : </div>
        <div className='price'>{checkout}</div>
        </div>
        <div className='row'>
        <div className='total price'>Total : </div>
        <div className='price'>{total.ttl}</div>
        </div>
        <div className='row'>
        <div className='total price'>Discount : </div>
        <div className='price'>{total.disc}</div>
        </div>
        <div className='row'>
        <div className='total price'>Final : </div>
        <div className='price'>{Number(total.ttl-total.disc).toFixed(2)}</div>
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
   
    
    
}