const fs = require('fs');

fs.readFile('./src/style/light.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/style/light.js',
    `const lightTheme = \`${data}\`;\nexport default lightTheme;\n`,
    (err) => { if (err) throw err; }, // eslint-disable-line no-shadow
  );
});

fs.readFile('./src/style/dark.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/style/dark.js',
    `const darkTheme = \`${data}\`;\nexport default darkTheme;\n`,
    (err) => { if (err) throw err; }, // eslint-disable-line no-shadow
  );
});
