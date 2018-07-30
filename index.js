'use strict'
const cote = require('cote')
const level = require('level')

const db = level('./elife.db')

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


