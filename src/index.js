import React from 'react';
import Base64 from './base64';
import Preview from 'Preview';

const Plugin = ({ term, display, actions }) => {
  const Methods = {
    DECODE: 'decode',
    ENCODE: 'encode'
  };

  const matcher = (str, expression) => str.match(expression);
  const termMatch = matcher(term, /^base64\s+(.+)/i);

  if (!term.startsWith('base64')) return;

  Object.keys(Methods).map((method, index) => {
    display({
      id: index,
      title: `Use base64 ${method}`,
      getPreview: () => <Preview key={index} method={method.toLowerCase()} />,
      onSelect: (event) => {
        event.preventDefault();

        return actions.replaceTerm(`base64 ${method.toLowerCase()} `);
      }
    });
  });

  if (matcher(termMatch[1], /^encode\s+(.+)/i)) {
    const stringToEncode = termMatch[1].replace(Methods.ENCODE, '');
    const decoded = new Base64().encode(stringToEncode);

    return display({
      title: `= ${decoded}`,
      onSelect: (event) => actions.copyToClipboard(decoded)
    })
  }

  if (matcher(termMatch[1], /^decode\s+(.+)/i)) {
    const stringToDecode = termMatch[1].replace(Methods.DECODE, '');
    const encoded = new Base64().decode(stringToDecode);

    return display({
      title: `= ${encoded}`,
      onSelect: (event) => actions.copyToClipboard(encoded)
    })
  }
};

module.exports = {
  fn: Plugin,
  keyword: 'base64'
};

export default Plugin;
