import React from 'react';
const ReactDOM = require('react-dom');

import Editor from './editor';

const interpreter = require('piet-interpreter');

const code = [
  ['lred', 'dblue', 'dgreen', 'lyellow', 'lmagenta', 'dyellow', 'cyan', 'dred', 'black', 'white', 'dred'],
  ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'dred', 'dred', 'white', 'dred'],
  ['white', 'dcyan', 'white', 'white', 'white', 'black', 'white', 'yellow', 'black', 'white', 'dred'],
  ['white', 'dcyan', 'dcyan', 'dcyan', 'dcyan', 'dcyan', 'dyellow', 'yellow', 'white', 'black', 'dred'],
];

let world = interpreter.create(code, ['20']);
let str = "";

while(!world.halt) {
  str += (JSON.stringify(world.env) + "\n");
  world = interpreter.next(world);
}

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const output = document.getElementById('output');
  output.innerText = str;
  ReactDOM.render(<Editor />, editor);
});
