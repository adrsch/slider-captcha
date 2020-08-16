const refreshIcon = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 3.44 2.728"><g transform="matrix(0 .77913 -.77913 0 3.288 -.317)" opacity="1" fill="${color}"><path d="M.922 1.012a1.618 1.618 0 00-.482 1.15c0 .808.588 1.478 1.36 1.607v-.558a1.086 1.086 0 01-.816-1.05c0-.3.124-.57.322-.765l.494.493V.53H.44zm2.782 1.15c0-.81-.589-1.479-1.36-1.608v.558c.468.121.816.543.816 1.05 0 .3-.125.57-.322.765l-.455-.454-.04-.04v1.36h1.361l-.483-.482c.296-.295.483-.699.483-1.15z"/></g></svg>`;

const arrowIcon = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.44 2.728" height="10.312" width="13"><g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)"><path d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z" fill="${color}"/></g></svg>`;

const successIcon = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.44 2.728" height="10.312" width="13"><path d="M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z" fill="${color}"/></svg>`;

const failureIcon = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="10.312" viewBox="0 0 3.44 2.728"><path d="M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z" fill="${color}"/></svg>`;

// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
const loadingIcon = (color) => `<svg width="38" height="38" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="${color}" stop-opacity="0" offset="0%"/><stop stop-color="${color}" stop-opacity=".631" offset="63.146%"/><stop stop-color="${color}" offset="100%"/></linearGradient></defs><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/></path><circle fill="${color}" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/></circle></g></svg>`

export {
  loadingIcon,
  failureIcon,
  successIcon,
  refreshIcon,
  arrowIcon,
};
