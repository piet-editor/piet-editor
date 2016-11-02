import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor';
import gzip from 'gzip-js';
import base64 from 'base64-js';

const colorTable = {
  a: 'lred',
  b: 'lyellow',
  c: 'lgreen',
  d: 'lcyan',
  e: 'lblue',
  f: 'lmagenta',

  g: 'red',
  h: 'yellow',
  i: 'green',
  j: 'cyan',
  k: 'blue',
  l: 'magenta',

  m: 'dred',
  n: 'dyellow',
  o: 'dgreen',
  p: 'dcyan',
  q: 'dblue',
  r: 'dmagenta',

  W: 'white',
  K: 'black',
};

const hashs = location.hash.substring(1).split('&');
const vals = {};
// eslint-disable-next-line no-restricted-syntax
for (const h in hashs) {
  if ({}.hasOwnProperty.call(hashs, h)) {
    const t = hashs[h].split('=');
    const k = t[0];
    const v = t[1];
    vals[k] = v;
  }
}

let code;
try {
  code = gzip.unzip(base64.toByteArray(vals.code.replace(/_/g, '/').replace(/-/g, '+').replace(/@/g, '=')));
  code = String.fromCharCode.apply("", new Uint16Array(code));
  code = code.split('|').map((row) => row.split('').map((v) => colorTable[v]));
} catch (e) {
  console.log(e)
}

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  ReactDOM.render(<Editor code={code} />, editor);
});
