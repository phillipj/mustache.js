require('./helper');

var renderHelper = require('./render-helper');

var fs = require('fs');
var path = require('path');

var _testsTemplate = path.join(__dirname, 'render-browser-tests.mustache');
var _templateContent = fs.readFileSync(_testsTemplate).toString();

var tests = renderHelper.getTests();
var content = Mustache.render(_templateContent, JSON.stringify(tests));

fs.writeFileSync(path.join(__dirname, 'render-browser-test.js'), content);