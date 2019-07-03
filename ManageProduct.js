import React, { Component } from 'react'
import axios from 'axios'
import { isTSEnumMember } from '@babel/types';

class ManageProduct extends Component {
    state = {
        products: [],
        selectedId: 0
    }

    componentDidMount(){
        // Akses database
        this.getProduct()
    }

    onSaveItem = id => {
        var nama = this.editName.value
        var desk = this.editDesc.value
        var harga = this.editPrice.value

        axios.patch(
            'http://localhost:2019/products/' + id,
            {
                name: nama,
                desc: desk,
                price: harga
            }
        ).then(res => {
            this.getProduct()
        }).catch(err => {
            console.log('Gagal')
        })
    }

    onDeleteItem = (id) => {
        axios.delete('http://localhost:2019/products/' + id)
        .then(() => {
            this.getProduct()
        })
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data, selectedId: 0})
            })
    }

    addProduct = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = parseInt(this.price.value)
        const pict = this.pict.value

        axios.post(
            'http://localhost:2019/products',
            {
                desc,
                name,
                price,
                src : pict
            }
        ).then(res => {
            // GET DATA
            this.getProduct()
        })
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            if(item.id !== this.state.selectedId){
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td>
                            <img className='list' src={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.setState({selectedId: item.id})}} className = 'btn btn-primary'>Edit</button>
                            <button onClick={()=>{this.onDeleteItem(item.id)}} className = 'btn btn-warning'>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <img className='list' src={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveItem(item.id)}} className = 'btn btn-primary'>Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className = 'btn btn-warning'>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ManageProduct