let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const conf = require('../../utils/config');
var msg = conf.get('responseMsg');
const service = require('../../utils/service');
const table = 'type'
let _ = require('lodash')
router.get('/', async (req, res) => {
    let reqQuery = req.query.filter || {};
    let reqFields = req.query.fields || '';
    let reqOrderBy = req.query.orderby || null;
    let reqLimit = req.query.limit || null;
    let reqOffset = req.query.offset || null;
    let fields = service.toSnakeUpperCase(reqFields);
    let fieldsSql = service.changeFieldSingle(fields)

    try {
        let query = ``;
        let where = ``;
        let orderby = ``;
        let limitOffset = ``;
        let user = null;
        if (reqOrderBy) {
            orderby = `ORDER BY "${_.snakeCase(reqOrderBy)}"`
        } else {
            orderby = ``;
        }

        if (reqLimit && reqOffset) {
            limitOffset = `LIMIT ${reqLimit} OFFSET ${reqOffset}`
        } else {
            limitOffset = ``
        }
        let sqlTypeName = ``;
        let sqlTypeCode = ``;
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlTypeName = ``;
            sqlTypeCode = ``;
        } else {
            let filter = JSON.parse(reqQuery)
            if (filter.typeName) {
                sqlTypeName = `LOWER("type_name") LIKE LOWER('%${filter.typeName}%')`
            }
            if (filter.typeCode) {
                sqlTypeCode = `LOWER("type_code") LIKE LOWER('%${filter.typeCode}%')`
            }
        }

        if (sqlTypeName !== '' && sqlTypeCode !== '') {
            where = `WHERE ${sqlTypeName} AND ${sqlTypeCode} AND "delete_date" IS NULL`
        } else {
            if (sqlTypeName == '' && sqlTypeCode == '') {
                where = `WHERE "delete_date" IS NULL`
            } else {
                where = `WHERE ${sqlTypeName !== '' ? sqlTypeName : sqlTypeCode}`
                where += `AND "delete_date" IS NULL`
            }
        }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} ${limitOffset};`
        console.log("\nTCL: query", query, '\n')
        var result = await postgresService.queryPostgrest(req, query, 'get');
        result.resultData = service.toSnakeCamelCase(result.resultData);
        console.log("\nTCL: result", result, '\n')
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
        let result;
        if (error) {
            result = error
        } else {
            result = msg.message.error
        }
        return res.json(result)
    }
});
router.get('/:typeId', async (req, res) => {
    let typeId = req.params.typeId || null
    try {
        let query = ``;
        let result;
        if (typeId) {
            query = `SELECT * FROM "${table}" WHERE "type_id" = ${typeId};`
        } else {
            result = msg.message.dataNotFound
        }
        console.log("\nTCL: query", query, '\n')
        result = await postgresService.queryPostgrest(req, query, 'get');
        result.resultData = service.toSnakeCamelCase(result.resultData);
        console.log("\nTCL: result", result, '\n')
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
        let result;
        if (error) {
            result = error
        } else {
            result = msg.message.error
        }
        return res.json(result)
    }
});

router.post('/', async (req, res) => {
    try {
        let body = req.body || {}
        let typeName = body.typeName.replace(/"/g, "'");
        let typeCode = body.typeCode.replace(/"/g, "'");
        let user = null;
        // ? "createBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        let fields = `"type_name", "type_code", "update_date", "update_by", "create_date", "create_by", "delete_date", "delete_by"`
        query = `INSERT INTO "${table}" (${fields}) VALUES ('${typeName}', '${typeCode}', null, null, current_timestamp, ${user}, null, null);`

        console.log("\nTCL: query", query, '\n')
        var result = await postgresService.insertPostgrest(req, query, 'post');
        console.log("\nTCL: result", result, '\n')
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
        let result;
        if (error) {
            result = error
        } else {
            result = msg.message.error
        }
        return res.json(result)
    }
});

router.delete('/:typeId', async (req, res) => {
    try {
        let typeId = req.params.typeId || null
        let query = '';
        let user = null;
        // ? "deleteBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        query = `UPDATE "${table}" SET "delete_date" = current_timestamp, "delete_by" = ${user} WHERE "type_id" = ${typeId};`
        console.log("\nTCL: query", query, '\n')
        var result = await postgresService.deletePostgrest(req, query, 'delete');
        console.log("\nTCL: result", result, '\n')
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
        let result;
        if (error) {
            result = error
        } else {
            result = msg.message.error
        }
        return res.json(result)
    }
});

router.put('/:typeId', async function (req, res) {
    try {

        let typeId = req.params.typeId || null
        let body = req.body || {}
        let typeName = body.typeName.replace(/"/g, "'");
        let typeCode = body.typeCode.replace(/"/g, "'");
        let user = null;
        let query = '';
        // ? "updateBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        query = `UPDATE "${table}" SET "type_name" = '${typeName}', "type_code" = '${typeCode}', "update_date" = current_timestamp, "update_by" = ${user} WHERE "type_id" = ${typeId};`
        console.log("\nTCL: query", query, '\n')
        var result = await postgresService.updatePostgrest(req, query, 'put');
        console.log("\nTCL: result", result, '\n')
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
        let result;
        if (error) {
            result = error
        } else {
            result = msg.message.error
        }
        return res.json(result)
    }
});

module.exports = router;