import React from 'react';
import Preview from 'Preview';
import Base64 from './base64';

const Plugin = ({ term, display, actions }) => {
  const Methods = {
    DECODE: 'decode',
    ENCODE: 'encode'
  };

  const pluginMatch = term.match(/^base64\s+(.+)/i);
  const decodeMatch = (str) => str.match(/^decode\s+(.+)/i);
  const encodeMatch = (str) => str.match(/^encode\s+(.+)/i);

  if (pluginMatch) {
    Object.keys(Methods).map((method, index) => {
      display({
        id: index,
        title: `Use base64 ${method}`,
        getPreview: () => <Preview key={index} method={method.toLowerCase()} actions={actions} />,
        onSelect: (event) => {
          event.preventDefault();

          return actions.replaceTerm(`base64 ${method.toLowerCase()} `);
        }
      });
    });

    if (encodeMatch(pluginMatch[1])) {
      const stringToEncode = pluginMatch[1].replace(Methods.ENCODE, '');
      const decoded = Base64().Encode(stringToEncode);

      return display({
        title: `= ${decoded}`,
        onSelect: (event) => actions.copyToClipboard(decoded)
      })
    } else if (decodeMatch(pluginMatch[1])) {
      const stringToDecode = pluginMatch[1].replace(Methods.DECODE, '');
      const encoded = Base64().Decode(stringToDecode);

      return display({
        title: `= ${encoded}`,
        onSelect: (event) => actions.copyToClipboard(encoded)
      })
    }
  }
};

module.exports = {
  fn: Plugin,
  keyword: 'base64'
};

export default Plugin;
