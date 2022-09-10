import React from 'react';

function Profile() {
  return (
    <header className="home-page-dog-history-header">
      <header className="home-page-dog-history-header-profile">
        <img src={`${process.env.PUBLIC_URL}/assets/dog-img.png`} alt="copy url" />
      </header>
      <body className="home-page-dog-history-header-achievements">업적</body>
    </header>
  );
}

export default Profile;
