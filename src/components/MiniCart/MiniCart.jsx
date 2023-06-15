import { useState } from 'react'
import './style.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { addNotify, removeNotify } from '../../redux/slice/notifySlice'
import ItemCartMini from "../ItemCartMini/ItemCartMini"
function MiniCart({color, title, content}) {
    const carts =[
        {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          },
          {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          }, {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          }, {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          }, {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          }, {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          }, {
            "idProduct": 2,
            'product': {
                id: 1684427804962,
                title: 'Samsung Galaxy Watch 5 (40mm) LTE - Smartwatch Silver',
                images: [
                  'https://m.media-amazon.com/images/I/51TeJzD4VzL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/519ItLaYMvL._AC_SL1200_.jpg',
                  'https://m.media-amazon.com/images/I/51i1PhDkYRL._AC_SL1200_.jpg'
                ],
                product_details: {
                  asin: 'B0BHWYT1R3',
                  fabrikant: 'Samsung',
                  batterijen: '1 Lithium-polymeer batterijen vereist. (inbegrepen)',
                  land_van_herkomst: 'Spanje',
                  productafmetingen: '14 x 0.5 x 3.47 cm; 200 gram',
                  datum_eerste_beschikbaarheid: '11 oktober 2022',
                  gegarandeerde_software_updates_tot: 'onbekend'
                },
                price: 239,
                currency: 'EUR',
                quantity_by_featured: [
                  {
                    color: 'orange',
                    quantity: 192
                  },
                  {
                    color: 'black',
                    quantity: 167
                  },
                  {
                    color: 'white',
                    quantity: 1
                  },
                  {
                    color: 'gold',
                    quantity: 0
                  }
                ]
              },
            "quantity": 1,
            "color" : "red",
            "id": 2
          },
          
    ]
    return (
    <div className='main_mini_cart'>
        <div className='header_mini_cart'>
        <h6 style={{color:"black", fontWeight:"600"}}>Cart</h6>
        </div>
        <div className='items_cart_mini'>
            {carts.map((tmp,index)=>{
                return <ItemCartMini key={index} cart = {tmp} />
            })}
        </div>
        <Link to={"/checkout"} style={{marginTop: "10px", color: "#3b71ca", textAlign:"center"}}>Cart view </Link>

    </div>
    )
}

export const colors =  {
    success:'rgb(1, 102, 1)',
    error:"rgb(173, 26, 26)",
    warning:'rgb(182, 165, 15)'

}
   
export default MiniCart;