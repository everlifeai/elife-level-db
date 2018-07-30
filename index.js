'use strict'
const cote = require('cote')
const level = require('level')


const db = level('./elife.db')

const dbService = new cote.Responder({
    name: 'Everlife DB Service',
    key: 'everlife-db-svc',
})

dbService.on('put', (req, cb) => {
    if(!req.key) cb('No key to save in DB')
    else db.put(req.key, req,val, cb)
})


