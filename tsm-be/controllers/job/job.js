let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const table = 'Type'
router.get('/', async (req, res) => {
    let reqQuery = req.query.filter || {};
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
            where = `WHERE ${sqlTypeName} AND ${sqlTypeCode} AND "deleteDate" IS NULL`
        } else {
            if (sqlTypeName == '' && sqlTypeCode == '') {
                where = `"deleteDate" IS NULL`
            } else {
                where = `WHERE ${sqlTypeName !== '' ? sqlTypeName : sqlTypeCode}`
                where += `AND "deleteDate" IS NULL`
            }
        }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} LIMIT ${reqLimit} OFFSET ${reqOffset};`
        var result = await postgresService.queryPostgrest(req, query, 'get');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

router.post('/', async (req, res) => {
    try {
        let body = req.body || {}
        let typeName = body.typeName.replace(/"/g, "'");
        let typeCode = body.typeCode.replace(/"/g, "'");
        // ? "createBy" เอาค่ามาจากไหน
        query = `INSERT INTO "${table}" ("typeName", "typeCode", "updateDate", "updateBy", "createDate", "createBy", "deleteDate", "deleteBy") VALUES ('${typeName}', '${typeCode}', null, null, current_timestamp, 'test_user', null, null);`
        console.log("TCL: query", query)
        var result = await postgresService.insertPostgrest(req, query, 'post');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

router.delete('/:typeId', async (req, res) => {
    try {
        let typeId = req.params.typeId || null
        let query = '';
        // ? "deleteBy" เอาค่ามาจากไหน
        query = `UPDATE "${table}" SET "deleteDate" = current_timestamp, "deleteBy" = 'test_user' WHERE "typeId" = ${typeId};`
        var result = await postgresService.deletePostgrest(req, query, 'delete');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

router.put('/:typeId', async function (req, res) {
    try {

        let typeId = req.params.typeId || null
        let body = req.body || {}
        let typeName = body.typeName.replace(/"/g, "'");
        let typeCode = body.typeCode.replace(/"/g, "'");

        let query = '';
        // ? "updateBy" เอาค่ามาจากไหน
        query = `UPDATE "${table}" SET "typeName" = '${typeName}', "typeCode" = '${typeCode}', "updateDate" = current_timestamp, "updateBy" = 'test_user' WHERE "typeId" = ${typeId};`
        console.log("TCL: query", query)
        var result = await postgresService.updatePostgrest(req, query, 'put');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

module.exports = router;