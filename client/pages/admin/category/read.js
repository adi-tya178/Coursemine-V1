import Layout from '../../../components/Layout'
import withAdmin from '../../withAdmin'
import { useState, useEffect } from 'react'
import {API} from '../../../config'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { showSuccessMessage, showErrorMessage} from '../../../helper/alert'
//import { serialize } from 'uri-js'
//import { sample } from 'lodas'
import Resizer from "react-image-file-resizer";


const Read = ({user, token}) => {

    const [state, setState] = useState({
        error: '',
        success: '',
        categories: []
    })


    const {error, success, categories} = state 

    useEffect(() => {
            loadCategories()
    }, [])


    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, categories: response.data})
    }
    

    const confirmDelete = (e, slug) => {
        //console.log('delete >', slug);
        e.preventDefault();

        let answer = window.confirm('Are you sure you want to delete?')
        if(answer) {
            handelDelete(slug);
        }
    }

    const handelDelete = async (slug) => {
        try {
            const response = await axios.delete(`${API}/category/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('CATEGORY DELETE SUCCESS ', response);
            loadCategories();
        } catch (error) {
            console.log('CATEGORY DELETE ', error);
        }
    }

    const listCatagories = () => categories.map((c, i) => (
        <Link href={`/links/${c.slug}`}>
            <a style={{border: '1px solid red'}} className="bg-light p-3 col-md-6">
                <div>
                    <div className="row">
                      <div className="col-md-3">
                          <img src={c.image && c.image.url} alt={c.name} style = {{width:'100px', height:'auto'}} className="pr-3"/>
                      </div>
                      <div className="col-md-6">
                         <h3>{c.name}</h3>
                      </div>

                      <div className='col-md-3'>
                      <Link href={`/admin/category/${c.slug}`}>
                                    <button className="btn btn-sm btn-outline-success btn-block mb-1">Update</button>
                                </Link>

                          <button onClick={e => confirmDelete(e, c.slug)} className='btn btn-sm btn-outline-danger btn-block'>
                               Delete
                          </button>
                      </div>
                    </div>
                </div>
            </a>
            
        </Link>
    ))


    return (
        <Layout>
            <div className='row'>
                <div className='col'>
                    <h1>List of Categories</h1>
                </div>
            </div>

            <div className='row'>
            {listCatagories()}
            </div>
        </Layout>
    )

}

export default withAdmin(Read);