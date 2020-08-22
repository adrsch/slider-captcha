import Anchor from './anchor';
import Theme from './theme';
import React, { useState } from 'react';

const fetchCaptcha = (create) => () =>
  create instanceof Function
    ? create() // Use provided promise for getting background and slider
    : fetch(create, {
        // Use create as API URL for fetch
        method: 'GET',
        credentials: 'include',
      }).then((response) => response.json());

const fetchVerification = (verify) => (response, trail) =>
  verify instanceof Function
    ? verify(response, trail) // Use provided promise for verifying captcha
    : fetch(verify, {
        // Verification API URL provided instead
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: response,
          trail: trail,
        }),
      }).then((response) => response.json());

const SliderCaptcha = ({
  variant = 'light',
  create = 'captcha/create',
  verify = 'captcha/verify',
  callback = (token) => console.log(token),
  text = {
    anchor: 'I am human',
    challenge: 'Slide to finish the puzzle',
  },
} = {}) => {
  const [verified, setVerified] = useState(false);
  const submitResponse = (response, trail) =>
    new Promise((resolve, reject) => {
      fetchVerification(verify)(response, trail).then((verification) => {
        if (
          !verification.result ||
          verification.result !== 'success' ||
          !verification.token
        ) {
          resolve(false);
        }
        else {
          setTimeout(() => {
            callback(verification.token);
            setVerified(true);
          }, 500);
          resolve(true);
        }
      });
    });
  return (
    <div className="scaptcha-container">
      <Theme variant={variant} />
      <Anchor
        text={text}
        fetchCaptcha={fetchCaptcha(create)}
        submitResponse={submitResponse}
        verified={verified}
      />
    </div>
  );
};

export default SliderCaptcha;
