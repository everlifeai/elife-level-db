'use strict'
const cote = require('cote')
const client = new cote.Requester({
    name: 'Test DB Client',
    key: 'everlife-db-svc',
})

function main() {
    putTestValue((err) => {
        if(err) console.error(err)
        else getTestValue((err,val) => {
            if(err) console.error(err)
            else console.log('Got: ', val)
        })
    })
}

function putTestValue(cb) {
    client.send({ type: 'put', test:1}, (err,val) => {
        console.log('sent:', err, val)
    })
}

function getTestValue() {
}

main()
