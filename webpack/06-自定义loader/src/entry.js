var content = require('!./my-second-loader!./my-loader!./my-file');
console.log(content)
var div = document.createElement('div');
div.textContent = content;
document.body.appendChild(div);