let moment = require('moment')
let _ = require('lodash')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const conf = require('../../utils/config');
var msg = conf.get('responseMsg');
const service = require('../../utils/service');
const table = 'project';

router.get('/', async (req, res) => {
    let reqQuery = req.query.filter || {};
    console.log("🚀 ~ file: project.js ~ line 13 ~ router.get ~ reqQuery", reqQuery)
    let reqFields = req.query.fields || '';
    let reqOrderBy = req.query.orderby || '';
    let reqLimit = req.query.limit || '';
    let reqOffset = req.query.offset || '';
    let fields = service.toSnakeUpperCase(reqFields)
    let fieldsSql = service.changeFieldSingle(fields)
    let user = null;
    try {
        let query = ``;
        let where = ``;
        let limitOffset = ``;
        let orderby;
        console.log("🚀 ~ file: project.js ~ line 26 ~ router.get ~ reqOrderBy", reqOrderBy)
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

        let sqlProjectName = ``;

        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlProjectName = ``;
        } else {

            let filter = JSON.parse(reqQuery)
            if (filter.projectName) {
                sqlProjectName = `LOWER("project_name") LIKE LOWER('%${filter.projectName}%')`
            }
        }
 
        if (sqlProjectName !== '') {
            where = `WHERE ${sqlProjectName} AND "delete_date" IS NULL`
        } else {
            if (sqlProjectName == '') {
            where = `WHERE "delete_date" IS NULL`
        } 
    }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} ${limitOffset}`
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

router.get('/:projectId', async (req, res) => {
    let projectId = req.params.projectId || null
    try {
        let query = ``;
        let result;
        // console.log("🚀 ~ file: project.js ~ line 78 ~ router.get ~ projectId", projectId)
        if (projectId) {
            query = `SELECT * FROM "${table}" WHERE "project_id" = ${projectId};`
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
        let projectName = body.projectName.replace(/"/g, "'");
        let projectPhase = body.projectPhase.replace(/"/g, "'");
        let projectDetail = body.projectDetail.replace(/"/g, "'");
        let projectStartDate = body.projectStartDate.replace(/"/g, "'");
        let projectEndDate = body.projectEndDate.replace(/"/g, "'");
        let projectManDays = body.projectManDays ? body.projectManDays.replace(/"/g, "'") : 'null';
        let customerEmail = body.customerEmail ? body.customerEmail.replace(/"/g, "'") : 'null';
        let user = null;
        let fields = `"project_name","project_phase","project_detail","project_start_date","project_end_date","project_mandays","customer_email","update_date","update_by","create_date","create_by","delete_date","delete_by"`;
        // ? "createBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        query = `INSERT INTO "${table}" (${fields}) 
                VALUES ('${projectName}', '${projectPhase}', '${projectDetail}', '${projectStartDate}', '${projectEndDate}', '${projectManDays}', '${customerEmail}', null, null, current_timestamp, ${user}, null, null);`
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

router.delete('/:projectId', async (req, res) => {
    try {
        let projectId = req.params.projectId || null
        let query = '';
        let user = null;
        // ? "deleteBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        query = `UPDATE "${table}" SET "delete_date" = current_timestamp, "delete_by" = ${user} WHERE "project_id" = ${projectId};`
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

router.put('/:projectId', async function (req, res) {
    try {

        let projectId = req.params.projectId || null
        let body = req.body || {}
        let projectName = body.projectName.replace(/"/g, "'");
        let projectPhase = body.projectPhase.replace(/"/g, "'");
        let projectDetail = body.projectDetail.replace(/"/g, "'");
        let projectStartDate = body.projectStartDate.replace(/"/g, "'");
        let projectEndDate = body.projectEndDate.replace(/"/g, "'");
        let projectManDays = body.projectManDays ? body.projectManDays.replace(/"/g, "'") : null;
        let customerEmail = body.customerEmail ? body.customerEmail.replace(/"/g, "'") : null;
        let user = null;

        let query = '';
        // ? "updateBy" เอาค่ามาจากไหน..ยังไม่มีข้อมูล เพราะส่วนนี้ดึงมาจากตอน login ซึ่งระบบนี้ยังไม่มี login
        query = `UPDATE "${table}" SET "project_name" = '${projectName}', "project_phase" = '${projectPhase}', "project_detail" = '${projectDetail}', "project_start_date" = '${projectStartDate}', "project_end_date" = '${projectEndDate}', "project_mandays" = '${projectManDays}', "customer_email" = '${customerEmail}', "update_date" = current_timestamp, "update_by" = ${user} WHERE "project_id" = ${projectId};`
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