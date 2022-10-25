import React, { useEffect } from 'react';
import FooterNavigation from '../../common/components/FooterNavigation';
import './PostsPage.scss';

const posts = [
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    title: '카페왔당',
    content: '멍멍이랑 카페옴~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    id: 1,
    categoryKo: '카페',
    category: 'cafe',
    date: '2022-09-18',
    time: '15:30',
    weekDay: '일',
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    title: '산책왔당',
    content: '멍멍이랑 카페옴~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    id: 2,
    categoryKo: '산책',
    category: 'walk',
    date: '2022-09-18',
    time: '15:30',
    weekDay: '일',
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/post.png`,
    title: '독서실왔당',
    content: '멍멍이랑 카페옴~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    id: 3,
    categoryKo: '기타',
    category: 'etc',
    date: '2022-09-18',
    time: '15:30',
    weekDay: '일',
  },
];

function PostsPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <>
          <header className="post-img-result-header">
            <div className="post-img-result-header-date">
              {post.date} {post.weekDay} {post.time}
            </div>
          </header>
          <main className="post-img-result-main">
            <img src={post.img} width={window.innerWidth} height={window.innerWidth} alt="postImg" />
            <header className="post-img-result-main-header">
              <div className="post-img-result-main-header-title">{post.title}</div>
              <div className={`post-img-result-main-header-${post.category}`}>{post.categoryKo}</div>
            </header>
            <body className="post-img-result-main-content">{post.content}</body>
          </main>
        </>
      ))}
      <FooterNavigation />
    </div>
  );
}

export default PostsPage;
