import React, { useState, useEffect } from 'react';
import { LoadingIcon } from './icons';
import Challenge from './challenge';

const Card = ({ text, fetchCaptcha, submitResponse }) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState(false);
  const refreshCaptcha = () => {
    let isSubscribed = true;
    fetchCaptcha().then((captcha) => { 
      setTimeout(() => {
        console.log(isSubscribed);
        if (!isSubscribed) return;
        setKey(Math.random());
        setCaptcha(captcha);
      }, 300);
    });
    return () => (isSubscribed = false);
  };
  const completeCaptcha = (response, trail) =>
    new Promise((resolve, reject) => {
      submitResponse(response, trail).then((verified) => {
        if (verified) {
          resolve(true);
        }
        else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });

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
