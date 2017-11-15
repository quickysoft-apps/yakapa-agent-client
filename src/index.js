import App from './app'
import Client from './client'

const listen = (port) => {
	const app = new App({
		port
	})
	app.listen()
	return app
}

const client = (server, tag, nickname) => {
	return new Client({
		tag,
		nickname,
		server
	})
}

export default {
	listen,
	client
}