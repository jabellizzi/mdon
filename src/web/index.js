import chapter from './markdown-input/chapter0.js';
import compileMarkdown from '../compile/compile.js';

import './style.css';

// Get div panes
// Get Body
var body = document.querySelector('body');

// Create left pane
var leftPane = document.createElement('div');
leftPane.setAttribute('id', 'left-pane');
// Create left textarea
var leftInput = document.createElement('textarea');
leftInput.classList.add('left-text-input');
leftInput.innerHTML = chapter;
leftPane.appendChild(leftInput);

// Create right output pane
var rightPane = document.createElement('div');
rightPane.setAttribute('id', 'right-pane');
// Create right textarea
var rightInput = document.createElement('textarea');
rightInput.classList.add('right-text-input');

// Append panes to body
body.appendChild(leftPane);
// body.appendChild(middlePane);

leftInput.addEventListener('input', function(){
  var updatedMarkdown = leftInput.value;

  var html = compileMarkdown(updatedMarkdown);

  rightInput.innerText = html.header + html.body;
  rightPane.appendChild(rightInput);

  body.appendChild(rightPane);
})

var html = compileMarkdown(chapter);

rightInput.innerText = html.header + html.body;
rightPane.appendChild(rightInput);

body.appendChild(rightPane);