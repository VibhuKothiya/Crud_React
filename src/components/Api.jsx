import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Api = () => {
    const [data, setData] = useState([]);

    const { id } = useParams()
    const [values, setValues] = useState({
        id: id,
        name: '',
        email: ''
    })

//GET-DATA

    const fetchData = () => {
        axios.get('http://localhost:3001/post').then((res) => {
            setData(res.data);
        })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const inputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

//POST-DATA    
    const handleInput = () => {
        let NewData = {
            name: name.current.value,
            email: email.current.value,
        }

        axios.post('http://localhost:3001/post', NewData).then((res) => {
            setData([...data, res.data]);
        })
    }

    const deleteData = (id) => {
        axios.delete(`http://localhost:3001/post/${id}`).then((res) => {
            setData(data.filter((val) => val.id !== id))

        });
    }

//UPDATE-DATA
    const updatData = (id) => {
        axios.get(`http://localhost:3001/post/${id}`).then((res) => {
            setValues({ ...values, name: res.data.name, email: res.data.email })
            console.log(res.data);
        })
    }

    return (
        <>
            <lable>Name:</lable><input type="text" name="name" value={values.name} onChange={inputChange} />
            <lable>Email:</lable><input type="email" name="email" value={values.email} onChange={inputChange} />
            <button onClick={handleInput}>Add</button>

            <div className='row'>
                {
                    data?.map((val, ind) => {
                        return (
                            <div class="card" style={{ width: '18rem' }}>
                                <div class="card-body">
                                    <h5 class="card-title">{val.id}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{val.name}</h6>
                                    <p class="card-text">{val.email}</p>
                                    <button onClick={() => { deleteData(val.id) }}>Delet</button>
                                    <button onClick={() => { updatData(val.id) }}>Update</button>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}

export default Api
