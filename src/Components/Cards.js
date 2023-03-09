import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useFormik } from "formik";


import axios from 'axios';
import Posts from './Post';
import Pagination from './PaginationItem';
import { signUpSchema } from './Validation';
import Login from './Login';

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

export default function Cards() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://api.publicapis.org/entries');
        setPosts(res.data.entries
            );
        setLoading(false);
      };
  
      fetchPosts();
    }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(
          values
        );
        action.resetForm();
      },
    });
  console.log(
    errors
  ); 
  return (
    <div>
        <div>
        <div class="card m-5">
  <div class="card-body">

  <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="name" autoComplete="off"  name="name" id="name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name" value={values.name}  onChange={handleChange} onBlur={handleBlur}/>
    {errors.name && touched.name ? (
                      <p className="form-error text-danger">{errors.name}</p>
                    ) : null}
  
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input  type="email" autoComplete="off"  name="email" id="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter Email Address" value={values.email}  onChange={handleChange} onBlur={handleBlur}/>
   {errors.email && touched.email ? (
                      <p className="form-error text-danger">{errors.email}</p>
                    ) : null}
  
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Password</label>
    <input type="password" autoComplete="off"  name="password" id="password"class="form-control" aria-describedby="emailHelp" placeholder="Enter Password" value={values.password}  onChange={handleChange} onBlur={handleBlur}/>
    {errors.password && touched.password ? (
                      <p className="form-error text-danger">{errors.password}</p>
                    ) : null}
  
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1"> Confirm Password</label>
    <input type="password" autoComplete="off"  name="confirm_password" id="confirm_password" class="form-control" aria-describedby="emailHelp" placeholder="Confirm Password"  value={values.confirm_password}  onChange={handleChange} onBlur={handleBlur}/>
    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error text-danger">{errors.confirm_password}</p>
                    ) : null}
  </div>

<div className='text-center d-flex'>
<button type="submit" class="btn btn-primary mt-2 me-3 ">Submit</button>

</div>
</form>

  </div>
</div>
<div className='text-center'>
<Login/>
</div>




        </div>
  <div className='container mt-5'>
      <h1 className='text-dark text-center mb-3'>Cards</h1>
       <Posts posts={currentPosts} loading={loading} />
     <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
    <div>
        
    </div>
    </div>
  )
}


