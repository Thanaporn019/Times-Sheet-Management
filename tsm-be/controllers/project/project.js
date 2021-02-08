let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const table = 'Project'

router.get('/', async (req, res) => {

    console.log("TCL: req", req)
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
        if (sqlProjectName !== '') {
            where = `WHERE ${sqlProjectName} AND "deleteDate" IS NULL`
        } else {
            where = `"deleteDate" IS NULL`
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
        let projectName = body.projectName.replace(/"/g, "'");
        let projectPhase = body.projectPhase.replace(/"/g, "'");
        let projectDetail = body.projectDetail.replace(/"/g, "'");
        let projectStartDate = body.projectStartDate.replace(/"/g, "'");
        let projectEndDate = body.projectEndDate.replace(/"/g, "'");
        let projectManDays = body.projectManDays.replace(/"/g, "'");
        let customerEmail = body.customerEmail ? body.customerEmail.replace(/"/g, "'") : 'null';
        // ? "createBy" เอาค่ามาจากไหน
        query = `INSERT INTO "${table}" ("projectName", "projectPhase", "projectDetail", "projectStartDate", "projectEndDate", "projectManDays", "customerEmail", "updateDate", "updateBy", "createDate", "createBy", "deleteDate", "deleteBy") 
                                 VALUES ('${projectName}', '${projectPhase}', '${projectDetail}', '${projectStartDate}', '${projectEndDate}', '${projectManDays}', '${customerEmail}', null, null, current_timestamp, 'test_user', null, null);`
        console.log("TCL: query", query)
        var result = await postgresService.insertPostgrest(req, query, 'post');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

router.delete('/:projectId', async (req, res) => {
    try {
        let projectId = req.params.projectId || null
        let query = '';
        // ? "deleteBy" เอาค่ามาจากไหน
        query = `UPDATE "${table}" SET "deleteDate" = current_timestamp, "deleteBy" = 'test_user' WHERE "projectId" = ${projectId};`
        var result = await postgresService.deletePostgrest(req, query, 'delete');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
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
        let projectManDays = body.projectManDays.replace(/"/g, "'");
        let customerEmail = body.customerEmail ? body.customerEmail.replace(/"/g, "'") : null;

        let query = '';
        // ? "updateBy" เอาค่ามาจากไหน
        query = `UPDATE "${table}" SET "projectName" = '${projectName}', "projectPhase" = '${projectPhase}', "projectDetail" = '${projectDetail}', "projectStartDate" = '${projectStartDate}', "projectEndDate" = '${projectEndDate}', "projectManDays" = '${projectManDays}', "customerEmail" = '${customerEmail}', "updateDate" = current_timestamp, "updateBy" = 'test_user' WHERE "projectId" = ${projectId};`
        console.log("TCL: query", query)
        var result = await postgresService.updatePostgrest(req, query, 'put');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }
});

module.exports = router;