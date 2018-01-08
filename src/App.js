import React, { Component } from 'react';
import MyApp from './MyApp';
import {
  IntlProvider,
  FormattedMessage,
  FormattedNumber,
  FormattedDate,
  addLocaleData
} from 'react-intl';
import hu from 'react-intl/locale-data/hu';

addLocaleData(hu);

const locale = 'hu';

const messages = {
  hu: {
    'greeting': 'Szia {name}! {count, number} darab új üzeneted érkezett.',
    'product': 'Ennek a terméknek az ára { price }',
    'date': 'Ma { date } van.'
  }
};

class App extends Component {
  render() {
    return (
      <IntlProvider locale={ locale } messages={ messages.hu }>
        <React.Fragment>
          <MyApp />
          <FormattedMessage
            id="greeting"
            defaultMessage="Hello {name}! You have {count, number} {count, plural, one {message} other {messages}}"
            values={ {
              name: 'James Bond',
              count: 3222
            } }
          />

          <br /><br />

          <FormattedMessage
            id="product"
            defaultMessage="This product costs { price }"
            values={ {
              price: (
                <FormattedNumber
                  style="currency"
                  currency="HUF"
                  currencyDisplay="name"
                  minimumFractionDigits={ 0 }
                  value={ 1234 }
                />
              )
            } }
          />

          <br /><br />

          <FormattedMessage
            id="date"
            defaultMessage="Today is { date }"
            values={ {
              date: (
                <FormattedDate
                  value={ Date.now() }
                  month="long"
                  day="numeric"
                  year="numeric"
                />
              )
            } }
          />

        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default App;
