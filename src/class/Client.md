[__string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[__null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Null
[__promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[__SessionID]: ./SessionID.md
[__Me]: ./Me.md


# Client
The main class for interacting with the authentication servers.

## Constructor
```javascript
import { Client } from "auth-sdk";

const auth = new Client(client_id);
```

| PARAMETER	| TYPE | OPTIONAL | DEFAULT	| DESCRIPTION |
| - | - | - | - | - |
| `client_id` | [string](__string) | ❌ | *undefined* | Sets the API key for the instance to use. Get your own API key from Josh. |

## Properties

### `.client_id`
> Stores the API key activly being used by the client. Get your own API key from Josh.
<br/>**Type: [string](__string)**

### `.session_id`
> Stores the current authentication token if a user is logged in. This will be `null` if no user is logged in.
<br/>**Type: [SessionID](__SessionID) | [null](__null)**

## Methods

### `.createSession({ username, email, password })`
> Logs in a user by username/email and password. Only one `username` or `email` are requireds. Returns a promise of the [SessionID](__SessionID) they have automaticly been logged in with.
<br/>**Type: [Promise](__promise)<[SessionID](__SessionID)>**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `{ username }` | [string](__string) | Username of the user. |
| `{ email }` | [string](__string) | Email address of the user. |
| `{ password }` | [string](__string) | Password of the user. |

### `.createUser({ username, email, password })`
> Creates a user and logs them in. Returns the session they have automaticly been logged in with.
<br/>**Type: [Promise](__promise)<[SessionID](__SessionID)>**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `{ username }` | [string](__string) | Username of the new user. Can **NOT** be changed later. |
| `{ email }` | [string](__string) | Email address of the new user. |
| `{ password }` | [string](__string) | Password of the new user. |

### `.me()`
> Gets the user that is activly signed in.
<br/>**Type: [Promise](__promise)<[Me](__Me)>**

### `.setSession(session_id)`
> Gets the user that is activly signed in.

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `session_id` | [string](__string) | [SessionID](__SessionID) | Logs a user in from a stored session. |
