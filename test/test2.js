const {execSync} = require('child_process');
const util = require('util');

const fontSize = 24;
const color = 'blue';
const content = 'hoge';

execSync('convert -size 100x100 xc:red red.jpg');
execSync(util.format(
  'convert -font Bookman-DemiItalic -gravity center -pointsize %d -fill %s -draw "text 0,0 %s" red.jpg red.jpg',
  fontSize, color, content));
