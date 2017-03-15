import React, { Component, PropTypes } from 'react';
import './styles.scss';

export default function Preview ({method}) {
  if (!method) {
    return <div className="loading">loading...</div>
  }

  return (
    <div>
      <h1>{method}</h1>
      <p>Select it to use base64 {method}</p>
    </div>
  );
}

Preview.propTypes = {
  method: React.PropTypes.string,
  actions: React.PropTypes.object.isRequired,
};
