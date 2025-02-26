'use strict'
const cote = require('cote')({statusLogsEnabled:false})
const level = require('level')
const u = require('@elife/utils')
const path = require('path')

u.ensureExists(path.join(u.dataLoc(), 'level.db'), (err, dbdir) => {
    if(err) u.showErr(err)
    else startLevelDB(dbdir)
})

function startLevelDB(dbdir) {
    const db = level(dbdir)

    /*      understand/
     * The database microservice (partitioned by key `everlife-db-svc` to
     * prevent conflicting with other services.
     */
    const dbService = new cote.Responder({
        name: 'Everlife DB Service',
        key: 'everlife-db-svc',
    })

    /*      outcome/
     * Responds to a `put` request by saving values into the database
     * TODO: Security/partitioning for various services
     */
    dbService.on('put', (req, cb) => {
        if(!req.key) cb('No key to save in DB')
        else db.put(req.key, req.val, cb)
    })

    /*      outcome/
     * Responds to a `get` request by getting values from the database
     */
    dbService.on('get', (req, cb) => {
        if(!req.key) cb('Need key to get from DB')
        else db.get(req.key, cb)
    })
}

