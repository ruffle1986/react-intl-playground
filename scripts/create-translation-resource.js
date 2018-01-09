const glob = require('glob');
const fs = require('fs');
const mkdir = require('mkdirp');

const messages = glob.sync('./i18n/messages/src/**/*.json')
  .reduce((acc, path) => {
    let content = fs.readFileSync(path).toString();
    content = JSON.parse(content);
    content.forEach(item => {
      acc[item.id] = item.defaultMessage;
    });
    return acc;
  }, {});

mkdir.sync('./i18n/transifex/');

fs.writeFileSync('./i18n/transifex/resource.json', JSON.stringify(messages));

console.log('Done!');
