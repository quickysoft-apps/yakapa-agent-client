import App from './app'
import Client from './client'
import Common from './common'

export default class Agent {

	constructor(options) {
		const app = new App({
			port: options.port
		})
		const client = new Client({
			tag: options.tag,
			nickname: options.nickname,
			server: options.server
		})
		app.listen()
	}

}