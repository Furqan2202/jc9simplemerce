import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductItem extends Component {
    render(){
        var {id, name, price, src} = this.props.barang // {id, name, desc, price, src}
        // id = 1

        return (
            <div className="card col-3 m-5">
                <img src={src} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>Rp. {price}</p>
                    <input type='text' className='form-control'/>
                    <Link to={'/detailproduct/' + id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    <button className='btn btn-primary btn-block'>Add To Cart</button>
                </div>
            </div>
        )
    }
} 

export default ProductItem