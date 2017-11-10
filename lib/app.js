'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PORT = 3001;
var DEFAULT_HOST = 'localhost';

var App = function () {
	function App(options) {
		_classCallCheck(this, App);

		this.port = options.port ? options.port : DEFAULT_PORT;
		this.expressApp = (0, _express2.default)();
	}

	_createClass(App, [{
		key: 'listen',
		value: function listen() {
			var _this = this;

			this.expressApp.listen(this.port, function () {
				console.info(Common.now(), 'Listening on *:' + _this.port);
			});
		}
	}]);

	return App;
}();

exports.default = App;