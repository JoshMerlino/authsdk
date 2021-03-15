export interface SessionID {
	id: number;
	user_id: number;
	md5: string;
	client_id: string;
}

export class SessionID {

	id: number;
	user_id: number;
	md5: string;
	client_id: string;

	constructor(session_id: string) {

		// Get properties
		const { id, user_id, md5, client_id } = JSON.parse(Buffer.from(session_id, "base64").toString("utf8"));

		// Asign to this
		this.id = id;
		this.user_id = user_id;
		this.md5 = md5;
		this.client_id = client_id;

	}

	public toString() {
		return Buffer.from(JSON.stringify({
			id: this.id,
			user_id: this.user_id,
			md5: this.md5,
			client_id: this.client_id
		})).toString("base64");
	}

}
