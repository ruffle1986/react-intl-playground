const glob = require('glob');
const fs = require('fs');
const mkdir = require('mkdirp');

const messages = glob.sync('./src/i18n/**/*.json')
  .reduce((acc, path) => {
    let content = fs.readFileSync(path).toString();
    content = JSON.parse(content);
    content.forEach(item => {
      acc[item.id] = item.defaultMessage;
    });
    return acc;
  }, {});

mkdir.sync('./build/i18n');

fs.writeFileSync('./build/i18n/resource.json', JSON.stringify(messages));

console.log('Done!');
