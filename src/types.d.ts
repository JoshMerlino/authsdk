export interface Client {
	client_id: string = "";
	session_id: SessionID | null = null;
	createUser(params: any) : Promise<SessionID>;
	createSession(params: any) : Promise<SessionID>;
	sso(options: SSOOptions) : Promise<any>;
	me() : Promise<Me>;
	setSession(session_id: SessionID | string) : Promise<void>;
}

export interface Me {
	readonly _client: Client;
	readonly _rawuser: RawUser;
	createdAt: number;
	client: Client;
	username: string;
	displayname: string;
	id: number;
	avatarURL(size: number = 256) : string;
	emailAddress: string;
	nickname: string | null;
	changeEmailAddress(email_address: string) : Promise<void>;
	changeNickname(nickname: string | null) : Promise<void>;
	changePassword(old_password: string, new_password: string) : Promise<void>;
	changeAvatar(image: Buffer | string | false) : Promise<void>;
	isPassword(password: string) : boolean;
	delete(old_password: string) : Promise<any>;
	logout() : Promise<any>;
}

export interface RawUser {
	client_id: string;
	id: number;
	username: string;
	nickname: string;
	email_address: string;
	password_md5: string;
	created_at?: number;
}

export interface SessionID {
	id: number;
	user_id: number;
	md5: string;
	client_id: string;
}


export interface SSOOptions {
	email: string;
	redirect_url?: string;
	from?: string;
}
