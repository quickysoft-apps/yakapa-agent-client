import express from 'express'
import Common from './common'

const DEFAULT_PORT = 3001
const DEFAULT_HOST = 'localhost'

export default class App {

	constructor(options) {
		this.port = options.port ? options.port : DEFAULT_PORT
		this.expressApp = express()
	}

	listen() {
		this.expressApp.listen(this.port, () => {
			console.info(Common.now(), `Listening on *:${this.port}`)
		})
	}


}