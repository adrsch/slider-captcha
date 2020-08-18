import React, { useState, useEffect } from 'react';
import LoadingIcon from './icons/loading';
import Challenge from './challenge';

const Card = ({ text, fetchCaptcha, verifyResponse }) => {
  const [captcha, setCaptcha] = useState(false);
  const refreshCaptcha = () => {
    fetchCaptcha()
      .then((captcha) => setCaptcha(captcha));
  };
  const onComplete = (response, trail) => {
    if (!verifyResponse(response, trail)) refreshCaptcha();
  }

  useEffect(refreshCaptcha, []);

  return (
    <div className="scaptcha-card-container scaptcha-card-element">
      {captcha ? (
        <Challenge
          text={text}
          captcha={captcha}
          onComplete={onComplete}
        />
      ) : (
        <div className="scaptcha-card-loading scaptcha-card-element">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default Card;
