import React from 'react'
import { ShoppingCart } from "phosphor-react";
import image from '../assets/products/logo-no-background.png'
import '../style/navbar.css'
import {Link} from 'react-router-dom'
import { Shop } from '../pages/shop/Shop';


const Navbar = () => {
    return (
        <div className='logo-container'>
            <div className='logo'><Link to = {'/'}><img src = {image} alt ="logo" /></Link></div>
            <div className='cart-icon'><Link to="/cart">
                <ShoppingCart size={32} />
            </Link>
        </div>   
            <nav>
                <ul className='head-components'>
                    <li><Link to = {'/'} className = "under-line" onClick={Shop}>Home</Link></li>
                    <li><Link className = "under-line">English books</Link></li>
                    <li><Link className = "under-line">Return book</Link></li>
                    <li><Link className = "under-line">Logout</Link></li>
                </ul>
                
            </nav>
        </div>
    )
}

export default Navbar;