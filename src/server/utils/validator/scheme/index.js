const jsonScheme = require('require-all')({
  dirname: __dirname,
  filter: (fileName) => {
    if (!RegExp(/\.js$/).test(fileName)) {
      return fileName.split('.')[0];
    }

    return false;
  },
});

const scheme = Object.keys(jsonScheme).reduce((result, current) => {
  const schema = Object.assign({}, jsonScheme[current], {
    id: current,
  });
  result.push(schema);

  return result;
}, []);

module.exports = scheme;
