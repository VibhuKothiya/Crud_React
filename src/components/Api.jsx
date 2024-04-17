import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

const Api = () => {
    const [productlist, setProductlist] = useState([]);
    const [view, setView] = useState({})

    let ProductName = useRef();
    let price = useRef();
    let Desc = useRef();

    //Add-data
    const add = async () => {

        let product = {
            ProductName: ProductName.current.value,
            price: price.current.value,
            Desc: Desc.current.value
        }

        let res = await axios.post('http://localhost:4000/products', product);
        console.log(res);

        setProductlist([...productlist, res.data])

    }

    //Get-data
    const getProduct = async () => {
        let result = await axios.get('http://localhost:4000/products');
        setProductlist(result.data)
    }

    useEffect(() => {
        getProduct();
    }, [])

    //Delete-data
    const deleteData = async (id) => {
        let response = await axios.delete(`http://localhost:4000/products/${id}`);
        console.log(response);
        setProductlist(productlist.filter((val) => val.id !== id))

    }

    //View-data
    const viewData = (index) => {
        // console.log(index);
        let user = productlist[index];
        setView(user)
    }

    const handleView = (e) => {
        setView({ ...view, [e.target.name]: e.target.value })
    }


    // Update-Data
    const handleUpdate = () => {
        axios.put(`http://localhost:4000/products/${view.id}`, view).then((res) => {
            console.log(res);
            setProductlist(productlist.map((val) => {
                if (val.id == res.data.id) {
                    return res.data;
                }
                else {
                    return val;
                }
            }))
        })
    }

    return (
        <>

            <div>
                Name:<input type="text" name='ProductName' ref={ProductName} />
                Price:<input type="number" name='price' ref={price} />
                Description:<input type="text" name='Desc' ref={Desc} />
                <button onClick={add}>Add Product</button>
            </div>

            <div className="row mt-3">
                {
                    productlist.map((val, ind) => {
                        return (
                            <div class="card" style={{ width: '18rem' }}>
                                <div class="card-body">
                                    <h5 class="card-title">{val.ProductName}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{val.price}</h6>
                                    <p class="card-text">{val.Desc}</p>

                                    <button onClick={() => { viewData(ind) }} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        View</button>
                                    <button onClick={() => { deleteData(val.id) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


{/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div >
                                <label>Name:</label><input type="text" name='ProductName' value={view.ProductName} className='m-2' onChange={handleView} />
                                <br></br><lable>Price:</lable><input type="number" name='price' value={view.price} className='m-2' onChange={handleView} />
                                <br></br><lable>Description:</lable><input type="text" name='Desc' value={view.Desc} className='m-2' onChange={handleView} />

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdate} class="btn btn-primary" data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Api
