import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
return (
  <div>
        <div className='row'>
            {posts.map(post => (
        <div className='col-md-3'>
    <div class="card m-1">

    <div class="card-body">
      <h5 class="card-title">{post.API}</h5>
      <p class="card-text">{post.Description}</p>
      <p class="card-text"><small class="text-muted">{post.Category}</small></p>
    
  </div>
 
 
</div>
</div>
 ))}
 </div>
    </div>
  );
};

export default Posts;