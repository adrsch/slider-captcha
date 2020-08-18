import React, { useState } from 'react';
import Card from './card';

const Anchor = ({ text, fetchCaptcha, verifyResponse, verified }) => {
  const [open, setOpen] = useState(false);
  const handleCloseCard = () => setOpen(false);
  const handleSetOpen = () => setOpen(true);
  return (
    <div>
      <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleSetOpen}
      >
        <div className="scaptcha-anchor-checkbox scaptcha-anchor-element"></div>
        <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div>
      </div>
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleCloseCard}></div>
          <Card
            fetchCaptcha={fetchCaptcha}
            verifyResponse={verifyResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

export default Anchor;
