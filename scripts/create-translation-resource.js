const glob = require('glob');
const fs = require('fs');
const mkdir = require('mkdirp');

const messages = glob.sync('./build/messages/src/**/*.json')
  .reduce((acc, path) => {
    let content = fs.readFileSync(path).toString();
    content = JSON.parse(content);
    content.forEach(item => {
      acc[item.id] = item.defaultMessage;
    });
    return acc;
  }, {});

mkdir.sync('./build/transifex/');

fs.writeFileSync('./build/transifex/locales.json', JSON.stringify(messages));

console.log('Done!');
