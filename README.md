Internationalize your product
=================================

In this repo, I put together a basic workflow to deal with internationalization and lokalization in your real life, react application. To manage copies in the UI elements based on the user's detected locale code, I'm using the `react-intl` module. It's a set of react elements which helps you to display text on the UI in a declarative way based on the selected locale's language requirements. Under the hood, `react-intl` uses Javascript's built-in `Intl` api which is the part of the Ecmascript standard.

Further reading (React Intl docs): https://github.com/yahoo/react-intl

In order to enable i18n in your application, first you have to wrap your entire application in a Provider component to let the appropriate Receiver components to manage rendering the texts.

```javascript
import React from 'react';
import {
  IntlProvider, // this is the provider component

  // following items are the receiver components
  FormattedDate,
  FormattedTime,
  FormattedRelative,
  FormattedNumber,
  FormattedPlural,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';

const MyApp = (props) => (
  <FormattedMessage
    id="uid1"
    defaultMessage={ `Hello {user}! You have {unreadCount, number} {unreadCount, plural, {
      one {message}
      other {messages}
    }}` }
    values={ {
      user: props.user,
      unreadCount: props.unreadCount
    } }
  />
);

render(
  <IntlProvider>
    <MyApp user="John" unreadCount={ 1024 } />
  </IntlProvider>
  document.getElementById('root')
);
```

Why am I talking about provider and receiver components? It's a widely use pattern in React development in order to share values between components no matter where they are in the component tree. It saves you from passing down props to grandchildren by using react's context API. So technically the receiver components (Formatted*) can get the selected locale, the translated messages and the appropriate functionality related to `Intl` by wrapping your application in intl's provider component (IntlProvider) via context.

`react-intl` follows the `ICU` message syntax which is a well-known template language by translators: http://userguide.icu-project.org/formatparse/messages

In the browser we can easily detect the user's locale code with which we can decide what translations should be sent to the client. This detection part should be done on the server side so we wouldn't need to load every locale we have to deal with to the client's bundle js.

Where do these translated messages come from?

Transifex
=========

Transifex is a translation management system and seemed quite a good fit to get the job done. Building an own translating system would just take too much effort and it would take years to implement a half as good system as Transifex is.

After getting the Transifex token, we can start communicating with the API which is very helpful to make the appropriate steps part of our CI process.

`react-intl` has a Babel plugin which collects all the messages set in the <Formatted* /> components from the source code. It generates json files in the same folder structure they come from.

In order to enable the plugin you must run one of the following commands:

(production build)
```sh
$ npm run build
```

(development)
```sh
$ npm start
```

You can run all the commands related to i18n with the following command:

```sh
$ npm run i18n
```

FYI: the command above also runs when you execute `npm run build`

But let's take a look at them piece by piece:

**To generate a Transifex compatible resource file:**

```sh
$ npm run i18n:generate-resource
```

It collects all the json file within the `src/i18n` folder which holds the messages for all the components that renders lokalized text and generates a Transifex compatible json file so that we upload it to Transifex via the API.

**To upload a new resource file to Transifex**

```sh
$ TRANSIFEX_TOKEN=<token> npm run i18n:add-resource
```

**To modify an already existing resource on Transifex**

```sh
$ TRANSIFEX_TOKEN=<token> npm run i18n:update-resource
```
If we already have a resource with the same slug (unique id) we have to call a different API endpoint. That's why we have to have two different commands to add and modify resources.

To understand what happens when you modify a resource, please read the docs from Transifex:

https://docs.transifex.com/projects/updating-content#what-happens-when-you-update-files

**Download translations from Transifex**

We can download translations from Transifex based on the languages we want to translate to for a given resource.

There are two important things to see:

1. You can get the translations back via the API which have at least one translator

2. You can get the translations for a given locale if the translation is already reviewed. Otherwise, you will get the default message back.

You can download the translations by the following command:

```sh
$ TRANSIFEX_TOKEN=<token> npm run i18n:download-translations
```

It seems to be a good practice to run the i18n commands when you're making a new release of your application but if you need the translations b/c of some debugging purposes, you can run the commands individually in your development environment.
