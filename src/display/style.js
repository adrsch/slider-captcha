import { classes } from './classes';

const style = (colors, textStyle, { width, height }) => `
.${classes.anchorContainer} {
box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.1);
border: 1px solid rgba(0,0,0,0.12);
  background-color: ${colors.anchor.background};
  width: 100%;
  height: 50px;
  padding: 13px;
  max-width: 400px;
}

.${classes.anchorCheckbox} {
  display: inline-block;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 3px;
  height: 24px;
  width: 24px;
  padding-left: 3.5px;
  cursor: pointer;
  background-color: ${colors.anchor.checkbox};
}

.${classes.anchorText} {
  display: inline-block;
  color: ${colors.anchor.text};
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: ${textStyle.fontSize};
  font-family: ${textStyle.fontFamily};
  font-weight: ${textStyle.fontWeight};
  vertical-align: middle;
  line-height: 6px;
  height: 100%;
  margin-left: 13px;
}

.${classes.loading} {
  margin: 15px;
  position: absolute;
  top: 0;
  left: 0;
  min-width: ${width}px;
  min-height: ${height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}


.${classes.container} {
  position: absolute;
  padding: 15px 15px 0px 15px;
  min-width: ${width + 30}px;
  min-height: ${height + 72}px;
  background-color: ${colors.card.container};
  box-shadow: 0px -1px 0px -2px rgba(0,0,0,0.2), 0px 2px 9px 0px rgba(0,0,0,0.14), 0px 5px 9px 0px rgba(0,0,0,0.15);
  margin-top: -${height + 72 + 50}px;
}

.${classes.slider} {
  margin-left: 15px;
  margin-top: 15px;
  position: absolute;
  left: 5px;
  top: 0;
}

.${classes.refresh} {
  margin-top: 18px;
  margin-right: 18px;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  width: 20px;
  height: 20px;
  background-color: ${colors.card.control.background};
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  display: flex;
  padding-top: 1px;
  padding-left: 1px;
  align-items: center;
  justify-content: center;
}

.${classes.refresh}:hover {
  background-color: ${colors.card.control.active};
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}

.${classes.control} {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  width: 30px;
  height: 30px;
  background-color: ${colors.card.control.background};
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
}

.${classes.control}:hover {
  background-color: ${colors.card.control.active};
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}

.${classes.controlContainer} {
  margin-top: 7px;
  position: relative;
  height: 44px;
}

.${classes.controlTrack} {
  box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.2);
  position: absolute;
  top: 3px;
  left: 0;
  height: 24px;
  background-color: ${colors.card.track.background};
  border-radius: 12px;
}

.${classes.controlMask} {
  box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.2);
  position: absolute;
  top: 3px;
  left: 0;
  width: 0;
  height: 24px;
  background-color: ${colors.card.track.active};
  border-radius: 12px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.${classes.controlText} {
  color: ${colors.card.track.text};
  padding-left: 20px;
  position: absolute;
  top: 3px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: ${textStyle.fontSize};
  font-family: ${textStyle.fontFamily};
  font-weight: ${textStyle.fontWeight};
  line-height: 1;
}


.${classes.noSelect} {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -user-select: none;
}
`;

export { style };
