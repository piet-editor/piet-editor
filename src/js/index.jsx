import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor';

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
for (let h in hashs) {
  const t = hashs[h].split('=');
  const k = t[0];
  const v = t[1];
  vals[k] = v;
}

const code = vals.code.split('|').map((row) => row.split('').map((v) => colorTable[v]));

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  ReactDOM.render(<Editor code={code} />, editor);
});
