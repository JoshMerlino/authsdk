import fetch from "node-fetch";
import { v5 as hash } from "uuid";
import isObject from "isobject";
import { Me } from "./Me";
import { SessionID } from "./SessionID";

export class Client {

	client_id: string = "";
	session_id: SessionID | null = null;

	// Initializer
	constructor(client_id: string) {

		// Initialize 'insecure' requests
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		// Initialize client with app id
		this.client_id = client_id;

	}

	// Private method to fetch data which automaticly includes the authorization header
	async __fetch(path: string, method: string = "GET", postData?: any, headers: any = {  }) {

		const body = isObject(postData) ? JSON.stringify(postData) : postData

		return await fetch(`https://joshm.us.to/api/auth-sdk/v1/${path}`, {
        	method,
        	headers: {
				...headers,
				"content-type": "application/json",
				"authorization": this.session_id === null ? "" : this.session_id.toString()
  			},
        	body
		}).then(resp => resp.json()).catch(err => {
			throw new Error(err);
		});
	}

	__hash(text: string): string {
		return hash(text, hash(this.client_id, "25ac68df-88c0-47d5-8ec3-0246fd9da00a"))
	}

	// Create user method
	async createUser(params: any) : Promise<SessionID> {

		// Send request
    	const { success, error, sessionId } = await this.__fetch("create", "PUT", {
			...params,
			client_id: this.client_id
		});

		// If failed
		if(!success) throw new Error(error.message);

		const session: SessionID = new SessionID(sessionId);
		this.setSession(session);
		return session;

	}

	// Get login session
	async createSession(params: any) : Promise<SessionID> {

		// Send request
    	const { success, error, sessionId } = await this.__fetch("session", "PUT", {
			...params,
			client_id: this.client_id
		});

		// If failed
		if(!success) throw new Error(error.message);

		const session: SessionID = new SessionID(sessionId);
		this.setSession(session);
		return session;

	}

	// Get current user
	async me() : Promise<Me> {
		const { user, success, error } = await this.__fetch("me");
		if(!success) throw new Error(error.message);
		return new Me(user, this);
	}

	// Set session
	setSession(session_id: SessionID | string) {
		this.session_id = typeof session_id === "string" ? new SessionID(session_id) : session_id;
	}

}
