'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _agentClient = require('./agentClient');

var _agentClient2 = _interopRequireDefault(_agentClient);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _perfy = require('perfy');

var _perfy2 = _interopRequireDefault(_perfy);

var _ki1r0y = require('ki1r0y.lock');

var _dataForge = require('data-forge');

var _dataForge2 = _interopRequireDefault(_dataForge);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_PREFIX = 'yakapa';
var RESULT_STORED = EVENT_PREFIX + '/resultStored';

var server = new _server2.default(true);
var agentClient = new _agentClient2.default();

server.listen();

agentClient.emitter.on('connected', function () {
	console.info(_common2.default.now(), 'Storage connecté avec le tag', agentClient.tag);
});

agentClient.emitter.on('result', function (sender, message, from, date) {
	console.info(_common2.default.now(), 'Storing result', message, 'from', from);
	var jsonMessage = JSON.parse(message);
	var rootPath = path.join(__dirname, '..', '..', 'storage', from);
	if (!fs.existsSync(rootPath)) {
		fs.mkdirSync(rootPath);
	}
	var filename = path.join(rootPath, jsonMessage.extractor + '.json');
	(0, _ki1r0y.lock)(filename, function (unlock) {
		try {
			var result = jsonMessage.result;

			var newData = [{
				timestamp: date.slice(0, 19) + '.000Z',
				result: result
			}];
			var incomingDataFrame = new _dataForge2.default.DataFrame(newData);

			if (fs.existsSync(filename)) {
				var count = 10000; //related to extractor
				var days = 3; //related to extractor
				var last = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
				_perfy2.default.start('process file');
				var existingData = new _dataForge2.default.readFileSync(filename).parseJSON().where(function (x) {
					return x.timestamp > last.toJSON();
				}).tail(count - 1).toArray();
				console.log(_perfy2.default.end('process file').summary);
				var existingDataFrame = new _dataForge2.default.DataFrame(existingData);
				var storingDataFrame = existingDataFrame.concat(incomingDataFrame);
				_perfy2.default.start('write file');
				storingDataFrame.asJSON().writeFileSync(filename);
				console.log(_perfy2.default.end('write file').summary);
			} else {
				incomingDataFrame.asJSON().writeFileSync(filename);
			}

			console.info(_common2.default.now(), 'Result storage done for', from);
			var storedMessage = { from: from, extractor: jsonMessage.extractor };
			sender.emit(RESULT_STORED, JSON.stringify(storedMessage));
		} catch (error) {
			console.warn(_common2.default.now(), 'Result storage failed for', from, error);
		} finally {
			unlock();
		}
	});
});
//# sourceMappingURL=app.js.map