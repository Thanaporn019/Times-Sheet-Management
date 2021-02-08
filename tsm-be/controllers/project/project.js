let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const table = 'Project'
router.post('/', async (req, res) => {

    console.log("TCL: req", req)
    let reqQuery = req.query.filter || {};
    let reqParam = req.params || {};
    let reqFields = req.query.fields || '';
    let reqOrderBy = req.query.orderby || '';
    let reqLimit = req.query.limit || '';
    let reqOffset = req.query.offset || '';
    let fields = reqFields.split(',')
    try {
        let query = ``;
        let where = ``;
        let orderby;
        if (reqOrderBy) {
            orderby = `ORDER BY "${reqOrderBy}"`
        } else {
            orderby = ``;
        }
        let sqlProjectName = ``;
        
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlProjectName = ``;
            
        } else {
            let filter = reqQuery.split(',')
            for (const iterator of filter) {
                let data = iterator.split('=')
                if (data[0] === 'ProjectName') {
                    sqlProjectName = `LOWER("ProjectName") LIKE LOWER('%${data[1]}%')`
                }
                
            }
        }
        let fieldsSql = ``
        for (const iterator of fields) {
            fieldsSql += `"${iterator}",`
        }
        fieldsSql = fieldsSql.slice(0, fieldsSql.length - 1)
        if (sqlProjectName !== '' ) {
            where = `WHERE ${sqlProjectName}}`
        } else {
            
        }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} LIMIT ${reqLimit} OFFSET ${reqOffset};`
        var result = await postgresService.queryPostgrest(req, query, 'post');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }


});

module.exports = router;