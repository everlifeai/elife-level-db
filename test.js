'use strict'
const cote = require('cote')
const client = new cote.Requester({
    name: 'Test DB Client',
    key: 'everlife-db-svc',
})

/*      outcome/
 * Simple put/get test
 */
function main() {
    putTestValue((err) => {
        if(err) console.error(err)
        else getTestValue((err,val) => {
            if(err) console.error(err)
            else console.log('Got: ', val)
        })
    })
}

const KEY = 'my-test-key-32732'
function putTestValue(cb) {
    let val = Math.floor(Math.random()*100000)
    client.send({ type: 'put', key: KEY, val: val }, (err) => {
        if(err) cb(err)
        else {
            console.log('Put: ', val)
            cb()
        }
    })
}

function getTestValue(cb) {
    client.send({ type: 'get', key: KEY }, cb)
}

main()
