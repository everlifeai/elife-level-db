# Simple Storage for Everlife Avatars

This provides the avatar with it's a simple way of storing working data.
This can be used by core services as well as skills.

Like all Everlife services, it provides a microservice that is
partitioned with a specific key - in this case `everlife-db-svc`.

## Quick Start

```js
const cote = require('cote')
const client = new cote.Requester({
    name: 'Test DB Client',
    key: 'everlife-db-svc',
})
...

client.send({ type: 'put', key: KEY, val: val }, (err) => {
...

client.send({ type: 'get', key: KEY }, (err,val) => {
...

```
