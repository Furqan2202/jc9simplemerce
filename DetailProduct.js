import React, { Component } from 'react'
import axios from 'axios'

class DetailProduct extends Component {

    state = {
        product: {
            id: '',
            name: '',
            price: '',
            src: ''
        }
    }

    componentDidMount(){
        let pro_id = this.props.match.params.product_id

        axios.get('http://localhost:2019/products/' + pro_id)
        .then(res => {
            this.setState({
                product: res.data
            })
        })

        // axios.get(
        //     'http://localhost:2019/products',
        //     {
        //         params: {
        //             id: pro_id
        //         }
        //     }
        // ).then(res => {
        //     console.log(res.data)
        // })
    }

    render() {
        var {name, desc, price, src} = this.state.product
        // this.props.match.params.product_id
        // /detailproduct/:product_id -> definisi
        // /detailproduct/78 -> menggunakan
        return (
            <div className='card col-6 mt-5 mx-auto'>
                <img className='card-img-top' src={src} />
                <div className='card-body'>
                    <h3 className ='card-title'>Product: {name}</h3>
                    <p className='card-text'>Description: {desc}</p>
                    <p className='card-text'>Price: Rp.{price}</p>
                    <form className="input-group my-3"><input ref={input => this.name = input} className="form-control" defaultValue="0" type="number"/></form>
                    <button className='btn btn-primary'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default DetailProduct