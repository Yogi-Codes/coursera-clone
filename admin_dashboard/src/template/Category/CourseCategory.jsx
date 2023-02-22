import React, { useState } from 'react'
import Footer from '../../widgets/Footer'
import Header from '../../widgets/Header'
import Sidebar from '../../widgets/Sidebar'
import axios from 'axios'
import { CONST } from '../../constant'
import { Helmet } from 'react-helmet'
const CourseCategory = () => {
    const [st, setSt] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [cat, setCat] = useState()
    const [category, setCategory] = useState([])

    async function getCategory() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'getCategory');
        const rsp = await axios.post(CONST.API_SERVER + '/admin/category/get', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data.result);
        setIsLoaded(true)
        try {
            if (rsp.data.message.length > 0 && rsp.data.message === "Success") {
                const ttl = rsp.data.result[0]['title'];
                console.log("ttl" + ttl);
                setCategory(rsp.data.result)
                setIsLoading(false)
                setSt(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
        }
    }

    if (isLoaded === false) {
        setIsLoaded(true)
        getCategory();
    }



    async function submitForm() {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'addCategory');
        formData.append('title', cat);
        const rsp = await axios.post(CONST.API_SERVER + '/admin/category/', formData, {
            'Content-Type': 'text/plain',
        });
        console.log("Got data " + rsp.data);

        try {
            if (rsp.data.result.length > 0) {
                const ttl = rsp.data.result[0]['title'];
                console.log("ttl" + ttl);
                setCategory(rsp.data.result)
                setIsLoading(false)
                setSt(false)
            } else {
                alert("Data insert error!")
                setIsLoading(false)
            }
        } catch (error) {
            alert("Data insert error!")
        }

    }

    //  Delete 
    async function deleteCategory(id) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('action', 'deleteCategory');
        formData.append('id', id);
         await axios.post(CONST.API_SERVER + '/admin/category/delete', formData, {
            'Content-Type': 'text/plain',
        });  
        setIsLoaded(false)
    }

    setTimeout(() => {
        setIsLoading(false)
    }, 2000);

    return (
        <>
        <Helmet>
            <title>Course Category</title>
        </Helmet>
        {isLoading ? <div className='LoaderClass'></div> : null}
            <Header />
            <div className="page-wrapper default-version">
                <Sidebar act={2}/>

                <div class="body-wrapper">
                    <div class="bodywrapper__inner">
                        <div class="row align-items-center mb-30 justify-content-between">
                            <div class="col-lg-6 col-sm-6">
                                <h6 class="page-title">Course Category </h6>
                            </div>
                            <div class="col-lg-6 col-sm-6 text-sm-right mt-sm-0 mt-3 right-part">
                                <button className="icon-btn" onClick={() => { st ? setSt(false) : setSt(true); }}><i class="fa fa-plus"></i> Add Category </button>
                            </div>
                            {st ?
                                <div className="col-md-12 row" id='inpage-form'>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-3">
                                        <p>Enter category name/title </p>
                                        <input type="text" name="" id="" className='form-control' placeholder='Category' onChange={(e) => { setCat(e.target.value); }} />
                                    </div>
                                    <div className="col-md-3">
                                        <p> <br /> </p>
                                        <button type="submit" name="" id="" className='btn btn-outline-primary' onClick={() => submitForm()}>Add Category </button> &nbsp;
                                        <button type='button' className='btn btn-outline-secondary' onClick={() => { setSt(false) }} > Cancel </button>
                                    </div>
                                </div>
                                : null}
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card b-radius--10">
                                    <div class="card-body p-0">
                                        <div class="table-responsive--sm table-responsive">
                                            <table class="table table--light style--two">
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Category</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="list">

                                                    {category.map((e, i) => <tr>
                                                        <td>{i + 1}</td>
                                                        <td> {e.title} </td>
                                                        <td>
                                                            <button onClick={() => { deleteCategory(e.id); getCategory(); }} class="btn btn-danger"> Delete </button>
                                                        </td>
                                                    </tr>)}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer py-4">
                                        <nav aria-label="...">
                                            <ul class="pagination justify-content-end mb-0">
                                                <li>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>



    )
}

export default CourseCategory