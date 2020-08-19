import React, { useState, useEffect } from 'react';
import { LoadingIcon } from './icons';
import Challenge from './challenge';

const Card = ({ text, fetchCaptcha, submitResponse }) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState(false);
  const refreshCaptcha = () => {
    let isSubscribed = true;
    fetchCaptcha().then((captcha) => {
      if (isSubscribed)
      setKey(Math.random());
      setCaptcha(captcha);
    });
    return () => isSubscribed = false;
  };
  const completeCaptcha = (response, trail) => {
    if (submitResponse(response, trail)) return true;
    refreshCaptcha();
    return false;
  };

  useEffect(refreshCaptcha, []);

  return (
    <div className="scaptcha-card-container scaptcha-card-element">
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
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
