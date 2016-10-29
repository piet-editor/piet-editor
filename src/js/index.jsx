import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor';

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  ReactDOM.render(<Editor />, editor);
});
