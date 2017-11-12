import express from 'express'
import * as Common from 'yakapa-common'

const DEFAULT_PORT = 3001
const DEFAULT_HOST = 'localhost'

export default class App {

	constructor(options) {
		this.port = options.port ? options.port : DEFAULT_PORT
		this.expressApp = express()
	}

	listen() {
		this.expressApp.listen(this.port, () => {
			Common.logger.info(`Listening on *:${this.port}`)
		})
	}


}