import chapter1 from './markdown-input/chapter1.js';
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
leftInput.innerHTML = chapter1;
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
  outputMarkdown(updatedMarkdown);
})

var html = compileMarkdown(chapter1);

rightInput.innerText = html.header + html.body;
rightPane.appendChild(rightInput);

body.appendChild(rightPane);