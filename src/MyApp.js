import React from 'react';
import {
  FormattedMessage,
  FormattedRelative
} from 'react-intl';

export default class extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage
          id="relative"
          defaultMessage="opened {time} by {user}"
          values={ {
            user: 'Ruff',
            time: (
              <FormattedRelative
                value={ Date.now() - 10000 }
              />
            )
          } }
        />
      </div>
    );
  }
}
