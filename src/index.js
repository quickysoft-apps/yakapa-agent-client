import App from './app'
import Client from './client'
import Common from './common'

export default class Agent {

	constructor(options) {
		
		this._app = new App({
			port: options.port
		})		
		this._app.listen()
		
		this._client = new Client({
			tag: options.tag,
			nickname: options.nickname,
			server: options.server
		})
		
	}
	
	get client() {
    return this._client
  }

}