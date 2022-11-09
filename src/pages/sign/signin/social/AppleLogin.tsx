import React from 'react';
import AppleLogin from 'react-apple-login';
import "./AppleLoginButton.scss";

function AppleLoginButton() {
  const appleClientId = process.env.REACT_APP_APPLE_CLIENT_ID;
  return (
    <div className='apple-login-button'>
      <AppleLogin
        clientId={`${appleClientId}`}
        redirectURI="https://www.reward.delgo.pet/oauth/callback/apple"
        responseType="code id_token"
        responseMode="fragment"
        usePopup={false}
        designProp={{
          height: 60,
          width: 280,
          color: 'black',
          border: false,
          type: 'sign-in',
          border_radius: 15,
          scale: 1,
          locale: 'en_US',
        }}
      />
    </div>
  );
}

export default AppleLoginButton;
