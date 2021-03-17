import { Client } from "./Client";
import { RawUser } from "./RawUser";

import fetch from "node-fetch";
import { readFile } from "fs/promises";
import isURL from "is-url";
import isFile from "is-file";
import isImageURL from "is-image-url";
import isImage from "is-image";
import path from "path";
import lookupMime from "mime-types";
import { fromBuffer } from "file-type";

export class Me {

	readonly _client: Client;
	readonly _rawuser: RawUser;

	// Initializer
	constructor(user: RawUser, client: Client) {
		this._rawuser = user;
		this._client = client;
	}

	get createdAt() {
		return this._rawuser.created_at
	}

	get client() {
		return this._client;
	}

	get username() {
		return this._rawuser.username;
	}

	get displayname() {
		return this._rawuser.nickname || this._rawuser.username;
	}

	get id() {
		return this._rawuser.id;
	}

	avatarURL(size: number = 256) {
		return `https://joshm.us.to/api/authsdk/v1/avatar?id=${this._rawuser.id}&size=${size}`;
	}

	get emailAddress() {
		return this._rawuser.email_address;
	}

	get nickname() {
		return this._rawuser.nickname;
	}

	async changeEmailAddress(email_address: string) {
		const { success, error } = await this._client.__fetch("me", "PATCH", { email_address });
		if(!success) throw new Error(error.message);
		this._rawuser.email_address = email_address;
	}

	async changeNickname(nickname: string | null) {
		if(nickname === null) nickname = this._rawuser.username;
		const { success, error } = await this._client.__fetch("me", "PATCH", { nickname });
		if(!success) throw new Error(error.message);
		this._rawuser.nickname = nickname;
	}

	async changePassword(old_password: string, new_password: string) {
		if(!this.isPassword(old_password)) throw new Error("Invalid password.");
		const { success, error } = await this._client.__fetch("me", "PATCH", { password: new_password });
		if(!success) throw new Error(error.message);
		this._rawuser.password_md5 = this._client.__hash(new_password);
	}

	async changeAvatar(image: Buffer | string | false) {

		// If reset image
		if(image === false) return this._client.__fetch(`avatar?id=${this.id}`, "DELETE");

		// Initialize image mime type
		let mime: string | false = "";
		let buffer: Buffer;

		// If image is not a binary file
		if(typeof image === "string") {

			// If image is a url and not a path
			if(isURL(image) && isImageURL(image)) {

				// Get mime type
				mime = lookupMime.lookup(image);

				// Read URL
				buffer = await fetch(image).then(res => res.buffer());

			}

			// If image is a path that resolves an image
			else if(isFile(path.resolve(image)) && isImage(path.resolve(image))) {

				// Get mime type
				mime = lookupMime.lookup(image);

				// Read file
				buffer = await readFile(path.resolve(image));

			}

			// If unknown file or image was uploaded
			else {
				throw new Error(`Image '${image}' is not an image`);
			}

		}

		// If image is buffer
		else if(image instanceof Buffer) {

			// Set image to buffer
			buffer = image;

			// Set mime
			const fileType = await fromBuffer(buffer);
			if(fileType !== undefined) mime = fileType.mime;

		}

		// If neither
		else {
			throw new Error("Avatar must be a path to an image file or a binary image buffer.");
		}

		// If not image buffer
		if((mime || "").split("/")[0] !== "image" || mime === false) throw new Error(`Mime type '${mime}' does not match 'image/*'.`);

		// Upload
		return this._client.__fetch(`avatar?id=${this.id}`, "PUT", {
			mime,
			buffer: buffer.toString("base64")
		});

	}

	isPassword(password: string) {
		const md5: string = this._client.__hash(password);
		return md5 === this._rawuser.password_md5;
	}

	delete(old_password: string) {
		if(!this.isPassword(old_password)) throw new Error("Invalid password.");
		return this._client.__fetch("me", "DELETE");
	}

	logout() {
		return this._client.__fetch("session", "DELETE");
	}

}
