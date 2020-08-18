const fs = require('fs');

fs.readFile('./src/display/style/light.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/display/style/light.js',
    `const lightTheme = \`${data}\`; export default lightTheme;`,
    (err) => { if (err) throw err; },
  );
});

fs.readFile('./src/display/style/dark.css', 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(
    './src/display/style/dark.js',
    `const darkTheme = \`${data}\`; export default darkTheme;`,
    (err) => { if (err) throw err; },
  );
});
