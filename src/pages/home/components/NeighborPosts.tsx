import React from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS_PATH } from '../../../common/constants/path.const';

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
  const navigate = useNavigate();
  const moveToPostsPage = () => {
    navigate(POSTS_PATH);
  };
  return (
    <div className="home-page-neighbord-posts">
      <header className="home-page-neighbord-posts-header">
        <div className="home-page-neighbord-posts-header-title">우리동네 멍멍이들의 하루</div>
        <div className="home-page-neighbord-posts-header-all" aria-hidden="true" onClick={moveToPostsPage}>
          전체보기
        </div>
      </header>
      <main className="home-page-neighbord-posts-container">
        {posts.map((post) => (
          <div className="home-page-neighbord-post" key={post.id}>
            <div className="img-overLay" />
            <img src={post.img} alt="post-img" />
          </div>
        ))}
      </main>
    </div>
  );
}

export default NeighborPosts;
