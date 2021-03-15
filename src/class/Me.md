[__string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[__null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Null
[__promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[__boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[__Buffer]: https://nodejs.org/api/buffer.html
[__number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[__SessionID]: ./SessionID.md
[__Client]: ./Client.md
[__RawUser]: ./RawUser.md


# Me
The class representing the currently authenticated user.

## Constructor
```javascript
import { Me } from "auth-sdk";

const me = new Me(user, client);
```

| PARAMETER	| TYPE | OPTIONAL | DEFAULT	| DESCRIPTION |
| - | - | - | - | - |
| `user` | [RawUser](__RawUser) | ❌ | *undefined* | Sets the information to initialize the user object from the REST API. |
| `client` | [Client](__Client) | ❌ | *undefined* | Instance of the client containing the session that is mapped to the target user. |

## Properties

### `.client`
> Returns the Client that initially fetched the user.
<br/>**Type: [Client](__Client)**

### `.createdAt`
> Returns the epoch in ms of the accounts creation.
<br/>**Type: [number](__number)**

### `.displayname`
> Returns the nickname or username if it dosn't exist.
<br/>**Type: [string](__string)**

### `.emailAddress`
> Returns the email address of the user.
<br/>**Type: [string](__string)**

### `.id`
> Returns the unique ID of the user.
<br/>**Type: [number](__number)**

### `.nickname`
> Returns the nickname of the user if they set it.
<br/>**Type: [string](__string) | [null](__null)**

### `.username`
> Returns the username of the account.
<br/>**Type: [string](__string) | [null](__null)**

## Methods

### `.avatarURL(size? = 256)`
> Returns the URL of the users profile picture.
<br/>**Type: [string](__string)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `size` | [number](__number) | The resolution to rescale the avatar to. |

### `.changeAvatar(image)`
> Uploads a new profile picture.
<br/>**Type: [Promise](__promise)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `image` | [string](__string) \| [Buffer](__Buffer) \| `false` | URL, Path or binary buffer of a image to upload. If image is `false` it will reset to the original image the account got when it was created. |

### `.changeEmailAddress(email_address)`
> Changes the users email address.
<br/>**Type: [Promise](__promise)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `email_address` | [string](__string) | New email address. |

### `.changeNickname(nickname)`
> Changes the users nickname.
<br/>**Type: [Promise](__promise)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `nickname` | [string](__string) | New nickname. |

### `.changePassword(old_password, new_password)`
> Changes the users password.
<br/>**Type: [Promise](__promise)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `old_password` | [string](__string) | Old password to confirm the users identity. |
| `new_password` | [string](__string) | New password. |

### `.delete(password)`
> Deletes the user and all their assets on the server.
<br/>**Type: [Promise](__promise)**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `password` | [string](__string) | Password of the user. This is needed to confirm account deletion. |

### `.isPassword(password)`
> Checks if the given string is the users current password.
<br/>**Type: [Promise](__promise)<[boolean](__boolean)>**

| PARAMETER	| TYPE | DESCRIPTION |
| - | - | - |
| `password` | [string](__string) | Password to check. |

### `.logout()`
> Marks the session id the user is signed in with as stale and thus requires the user to sign in again and generate a new one.
<br/>**Type: [Promise](__promise)**
