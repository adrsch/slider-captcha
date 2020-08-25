import React from 'react';

const SuccessIcon = () => (
  <div className="scaptcha-icon-container">
    <svg
      className="scaptcha-icon-light"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <path
        d="M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z"
        fill="#202020"
      />
    </svg>
    <svg
      className="scaptcha-icon-dark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <path
        d="M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z"
        fill="#c6c6c6"
      />
    </svg>
  </div>
);

export default SuccessIcon;
