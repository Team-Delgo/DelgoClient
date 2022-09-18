import React from 'react';

const posts = [
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    name: '카페왔당',
    id: 1,
    category: 'cafe',
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    name: '산책왔당',
    id: 2,
    category: 'walk',
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    name: '독서실왔당',
    id: 3,
    category: 'etc',
  },
];

function NeighborPosts() {
  return (
    <div className="home-page-neighbord-posts">
      <header className="home-page-neighbord-posts-title">우리동네 멍멍이들의 하루</header>
      <div className="home-page-neighbord-posts-container">
        {posts.map((post) => (
          <div className="home-page-neighbord-post" key={post.id}>
            <div className="img-overLay"/>
            <img src={post.img} alt="post-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NeighborPosts;
