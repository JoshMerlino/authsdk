# authsdk
Easily implement authentication into your app with databases provided by Josh.

### Documentation
See the [wiki](https://github.com/JoshMerlino/auth-sdk/wiki).

### Example

```bash
npm i -s authsdk yaml prompt-sync
```

```ts
import { Client, SessionID } from "authsdk.js";
import YAML from "yaml";
import { readFile, writeFile } from "fs/promises";
import Prompt from "prompt-sync";

(async function(){

	// Initialize client
	const auth = new Client("fcbf46d5777a45399f1b4b646e572803");

	// Get credentials from file
	const storedCredentials = YAML.parse(await readFile("./credentials.yml", "utf8"));

	// If no stored credentials
	if(storedCredentials === null || !storedCredentials.hasOwnProperty("session")) {

		// Initialize prompt
		const prompt = Prompt();

		// Prompt for email and password
		const email = prompt("Email address: ");
		const password = prompt.hide("Password: ");

		// Get session
		const session: SessionID = await auth.createSession({ email, password });

		// Save session to file
		await writeFile("./credentials.yml", YAML.stringify({ session: session.toString() }), "utf8");

	}

	// If stored credentials were found, Set session from file
	else await auth.setSession(storedCredentials.session);

	// Get current logged-in user
	const me = await auth.me();

	// Welcome the user
	console.log(`Welcome ${me.displayname}`);

}())
```
