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
    console.log(Buffer.from("Javascript").toString('base64'));
    console.log(Buffer.from("IGphdmFzY3JpcHQ=", 'base64').toString('ascii'));

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
      const decoded = new Base64().encode(stringToEncode);

      return display({
        title: `= ${decoded}`,
        onSelect: (event) => actions.copyToClipboard(decoded)
      })
    } else if (decodeMatch(pluginMatch[1])) {
      const stringToDecode = pluginMatch[1].replace(Methods.DECODE, '');
      const encoded = new Base64().decode(stringToDecode);

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
