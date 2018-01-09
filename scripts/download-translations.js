const request = require('request-promise');
const fs = require('fs');

async function getLanguages() {
  console.log('Downloading languages');
  const languages = await request
    .get('https://www.transifex.com/api/2/project/the-ruffle-website/languages/')
    .auth('api', process.env.TRANSIFEX_TOKEN, false);
  return JSON.parse(languages);
}

async function getTranslations() {
  console.log('Downloading translations');
  const languages = await getLanguages();
  const promises = languages.map(async lang => {
    const tr = await request
      .get('https://www.transifex.com/api/2/project/the-ruffle-website/resource/transifex-resourcejson/translation/' + lang.language_code + '/?mode=reviewed&file')
      .auth('api', process.env.TRANSIFEX_TOKEN, false);
    return new Promise(resolve => {
      resolve({
        messages: JSON.parse(tr),
        locale: lang.language_code
      });
    });
  });
  return Promise.all(promises)
    .then(translations => {
      return translations.reduce((acc, tr) => {
        acc[tr.locale] = tr.messages
        return acc;
      }, {});
    });
}

async function run() {
  const translations = await getTranslations();
  console.log('Saving to file');
  fs.writeFileSync(
    './build/i18n/translations.json',
    JSON.stringify(translations)
  );
  console.log('Done!');
}

run();

