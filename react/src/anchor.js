import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import { SuccessIcon } from './icons';

const Anchor = ({
  text,
  fetchCaptcha,
  submitResponse,
  verified,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };
  const handleKey = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  return (
    <div>
      <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className={`scaptcha-anchor-checkbox ${!verified && 'scaptcha-anchor-checkbox-default'} scaptcha-anchor-element`}
          onKeyUp={handleKey}
        >
          {verified && (
            <SuccessIcon />
          )}
        </button>
        <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div>
      </div>
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleClose} />
          <Card
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  verified: PropTypes.bool.isRequired,
};

export default Anchor;
