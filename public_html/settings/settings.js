// This will search for files ending in .js and require them
// so that they are added to the webpack bundle
var context = require.context('./../src/', true, /.+\.js?$/);
context.keys().forEach(context);

import './../manifest.json';
import './../background.js';
import './../src/scss/style.scss';
