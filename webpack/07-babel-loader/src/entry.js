import {One} from './one'
var div = document.createElement('div');
div.textContent = new One(5,6).add();
document.body.appendChild(div);
