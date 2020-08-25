const fs = require('fs');

fs.readFile('./src/display/style/light.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/display/style/light.js',
    `const lightTheme = \`${data}\`;\nexport default lightTheme;\n`,
    (err) => { if (err) throw err; }, // eslint-disable-line no-shadow
  );
});

fs.readFile('./src/display/style/dark.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/display/style/dark.js',
    `const darkTheme = \`${data}\`;\nexport default darkTheme;\n`,
    (err) => { if (err) throw err; }, // eslint-disable-line no-shadow
  );
});
