let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const table = 'Type'
router.get('/', async (req, res) => {
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
        let sqlTypeName = ``;
        let sqlTypeCode = ``;
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlTypeName = ``;
            sqlTypeCode = ``;
        } else {
            let filter = reqQuery.split(',')
            for (const iterator of filter) {
                let data = iterator.split('=')
                if (data[0] === 'typeName') {
                    sqlTypeName = `LOWER("typeName") LIKE LOWER('%${data[1]}%')`
                }
                if (data[0] === 'typeCode') {
                    sqlTypeCode = `LOWER("typeCode") LIKE LOWER('%${data[1]}%')`
                }
            }
        }
        let fieldsSql = ``
        for (const iterator of fields) {
            fieldsSql += `"${iterator}",`
        }
        fieldsSql = fieldsSql.slice(0, fieldsSql.length - 1)
        if (sqlTypeName !== '' && sqlTypeCode !== '') {
            where = `WHERE ${sqlTypeName} AND ${sqlTypeCode}`
        } else {
            where = `WHERE ${sqlTypeName !== '' ? sqlTypeName : sqlTypeCode}`
        }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} LIMIT ${reqLimit} OFFSET ${reqOffset};`
        var result = await postgresService.queryPostgrest(req, query, 'get');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

module.exports = router;