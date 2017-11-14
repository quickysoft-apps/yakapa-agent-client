// Type definitions for client.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 
 */
export declare var DEFAULT_NICKNAME : string;

/**
 * 
 */
declare interface ClientEmitter {
		
	/**
	 * 
	 */
	new ();
		
	/**
	 * 
	 * @param event 
	 * @return  
	 */
	isWildcard(event : any): boolean;
		
	/**
	 * 
	 */
	connected(): void;
		
	/**
	 * 
	 * @param error 
	 */
	socketError(error : any): void;
		
	/**
	 * 
	 * @param error 
	 */
	connectionError(error : any): void;
		
	/**
	 * 
	 * @param ms 
	 */
	pong(ms : any): void;
		
	/**
	 * 
	 * @param event 
	 * @param socketMessage 
	 */
	wildcard(event : any, socketMessage : any): void;
}

/**
 * 
 */
declare interface Client {
		
	/**
	 * 
	 * @param options 
	 */
	new (options : any);
		
	/**
	 * 
	 */
	emitter : ClientEmitter;
		
	/**
	 * 
	 * @param json 
	 * @return  
	 */
	getJson(json : any): any;
		
	/**
	 * 
	 * @param socketMessage 
	 * @return  
	 */
	check(socketMessage : any): boolean;
		
	/**
	 * 
	 * @param event 
	 * @param payload 
	 * @param to 
	 */
	emit(event : any, payload : any, to : any): void;
		
	/**
	 * 
	 */
	connected(): void;
		
	/**
	 * 
	 * @param error 
	 */
	socketError(error : any): void;
		
	/**
	 * 
	 * @param error 
	 */
	connectionError(error : any): void;
		
	/**
	 * 
	 * @param packet 
	 */
	wildcard(packet : any): void;
}
