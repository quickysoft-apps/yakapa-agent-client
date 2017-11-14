// Type definitions for app.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 
 */
export declare var DEFAULT_PORT : number;

/**
 * 
 */
export declare var DEFAULT_HOST : string;

/**
 * 
 */
declare interface App {
		
	/**
	 * 
	 * @param options 
	 */
	new (options : any);
		
	/**
	 * 
	 */
	listen(): void;
		
	/**
	 * 
	 */
	port : number;
}
