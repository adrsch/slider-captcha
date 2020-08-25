import React from 'react';

const FailureIcon = () => (
  <div className="scaptcha-icon-container">
    <svg
      className="scaptcha-icon-light"
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10.312"
      viewBox="0 0 3.44 2.728"
    >
      <path
        d="M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z"
        fill="#202020"
      />
    </svg>
    <svg
      className="scaptcha-icon-dark"
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10.312"
      viewBox="0 0 3.44 2.728"
    >
      <path
        d="M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z"
        fill="#c6c6c6"
      />
    </svg>
  </div>
);

export default FailureIcon;
