const refreshIcon = (colors) => `
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="10.312" viewBox="0 0 3.44 2.728"><g transform="matrix(0 .77913 -.77913 0 3.288 -.317)" opacity="1" fill="${colors.challenge.control.icon}"><path d="M.922 1.012a1.618 1.618 0 00-.482 1.15c0 .808.588 1.478 1.36 1.607v-.558a1.086 1.086 0 01-.816-1.05c0-.3.124-.57.322-.765l.494.493V.53H.44zm2.782 1.15c0-.81-.589-1.479-1.36-1.608v.558c.468.121.816.543.816 1.05 0 .3-.125.57-.322.765l-.455-.454-.04-.04v1.36h1.361l-.483-.482c.296-.295.483-.699.483-1.15z"/></g></svg>
`;

const arrowIcon = (colors) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.44 2.728" height="10.312" width="13"><g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)"><path d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z" fill="${colors.challenge.control.icon}"/></g></svg>

`;

const successIcon = (colors) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3.44 2.728" height="10.312" width="13"><defs><symbol id="a" viewBox="0 0 12 16"><path d="M3.175 1.323L1.058 3.44 0 2.38l.397-.397.661.662 1.72-1.72z" stroke-width=".265"/></symbol></defs><g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)"><use height="100%" width="100%" transform="matrix(.5826 0 0 .5826 .131 .872)" xlink:href="#a" fill="${colors.challenge.control.icon}"/></g></svg>
`;

const failureIcon = (colors) =>`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3.44 2.728" height="10.312" width="13"><defs><symbol id="a" viewBox="0 0 12 16"><path d="M1.98 2.117l.991.992-.391.391-.993-.992-.992.992-.391-.391.992-.992-.992-.993.391-.391.992.992.993-.992.391.391z" stroke-width=".265"/></symbol></defs><g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)"><use height="100%" width="100%" transform="matrix(.5324 0 0 .5324 .186 .896)" xlink:href="#a" fill="${colors.challenge.control.icon}"/></g></svg>
`;

module.exports = {
  refreshIcon,
  arrowIcon,
  successIcon,
  failureIcon,
};
