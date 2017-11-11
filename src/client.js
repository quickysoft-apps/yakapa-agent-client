import 'babel-polyfill'
import io from 'socket.io-client'
import * as wildcard from 'socketio-wildcard'
import * as LZString from 'lz-string'
import { EventEmitter } from 'events'
import Common from './common'

const DEFAULT_NICKNAME = 'Agent'

class ClientEmitter extends EventEmitter {
    
  isWildcard(event) {
    return ['connected', 
            'socketError', 
            'connectionError', 
            'pong'].indexOf(event) == -1
  } 
  
  connected() {
    this.emit('connected')
  }
  
  socketError(error) {
    this.emit('socketError', error)
  }
  
  connectionError(error) {
    this.emit('connectionError', error)
  }
  
  pong(ms) {
    this.emit('pong', ms)
  }
  
  wildcard(args) {
    this.emit.apply(this, args)
  }
  
}

export default class Client {

  constructor(options) {

    this._emitter = new ClientEmitter()
    this._connected = false
    this._tag = options.tag
    this._nickname = options.nickname ? options.nickname : DEFAULT_NICKNAME
    this._server = options.server
    
    this._socket = io(this._server, {
      rejectUnauthorized: false,
      query: `tag=${this._tag}`
    })

    const patch = wildcard(io.Manager)
    patch(this._socket);

    socket.on('*', (packet) => { 
      const args = packet.data || []
      if (this._emitter.isWildcard(args[0])) {
        console.log('--------------------------------', args)
        this._emitter.wildcard(args)  
      }
    })

    this._socket.on('pong', (ms) => {
      this._emitter.pong(ms)
    })

    this._socket.on('connect', () => {
      this.connected()
    })

    this._socket.on('connect_error', (error) => {
      this.connectionError(error)
    })

    this._socket.on('error', (error) => {
      this.socketError(error)
    })
    
  }

  get tag() {
    return this._tag
  }

  get emitter() {
    return this._emitter
  }

  getJson(json) {
    return typeof json === 'object' ? json : JSON.parse(json)
  }

  check(socketMessage) {

    if (this._connected === false) {
      console.warn(`${Common.now()} Pas connecté`)
      return false
    }

    if (socketMessage == null) {
      console.warn(`${Common.now()} Message non défini`)
      return false
    }

    if (socketMessage.from == null) {
      console.warn(`${Common.now()} Expéditeur non défini'`)
      return false
    }
    
    return true
  }

  emit(event, payload, to) {
    const content = payload != null ? LZString.compressToUTF16(payload) : null
    const socketMessage = {
      from: this._tag,
      nickname: this._nickname,
      to: to,
      message: content
    }

    this._socket.emit(event, socketMessage)
  }

  connected() {
    console.info(Common.now(), 'Connecté à', this._server)
    this._connected = true
    this._emitter.connected()
  }

  socketError(error) {
    console.error(Common.now(), 'Socket error', error)
    this._emitter.socketError(error)
  }
 
  connectionError(error) {
    console.info(Common.now(), 'Erreur connexion', error)
    this._emitter.connectionError(error)
  }
  
}