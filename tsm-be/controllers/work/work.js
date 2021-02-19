let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const conf = require('../../utils/config');
var msg = conf.get('responseMsg');
const service = require('../../utils/service');
const table = 'work'
let _ = require('lodash')
router.get('/:dateFrom/:dateTo', async (req, res) => {
    let dateFrom = req.params.dateFrom || null
    let dateTo = req.params.dateTo || null
    let reqQuery = req.query.filter || {};
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
        let orderby;
        if (reqOrderBy) {
            orderby = `ORDER BY "${_.snakeCase(reqOrderBy)}"`
        } else {
            orderby = ``;
        }
        let sqlProjectName = ``;
        let sqlTypeName = ``;
        let sqlDateFrom = ``;
        let sqlDateTo = ``;
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlProjectName = ``;
            sqlTypeName = ``;
            sqlDateFrom = ``;
            sqlDateTo = ``;
        } else {
            let filter = JSON.parse(reqQuery)

            if (filter.projectName) {
                sqlProjectName = `LOWER("project_name") LIKE LOWER('%${filter.projectName}%')`
            }
           
            if (filter.typeName) {
                sqlTypeName = `LOWER("type_name") LIKE LOWER('%${filter.typeName}%')`
            }
            if (filter.dateFrom) {
                sqlDateFrom = date_from >= '${moment(filter.dateFrom).format("DD/MM/YYYY HH:mm:ss")}'
            }

            if (filter.dateTo) {
                sqlDateTo = date_to <= '${moment(filter.dateTo).format("DD/MM/YYYY HH:mm:ss")}'

            }

        }

        where = `WHERE work_date BETWEEN ${dateFrom} AND ${dateTo}`
        // if (sqlProjectName !== '') {
        //     where += `AND ${sqlProjectName}`
        // }
        // if (sqlTypeId !== '') {
        //     where += `AND ${sqlTypeId}`
        // }

        if (sqlProjectName !== '' && sqlTypeName !== '' && sqlDateFrom !== '' && sqlDateTo !== '') {
            where = `WHERE ${sqlProjectName} AND ${sqlTypeName} AND ${sqlDateFrom} AND ${sqlDateTo} AND "delete_date" IS NULL`
        } else {
            if (sqlProjectName == '' && sqlTypeName == '' && sqlDateFrom == '' && sqlDateTo == '') {
                where = `WHERE "delete_date" IS NULL`
            } else {
                where = `WHERE ${sqlProjectName !== '' ? sqlProjectName : sqlTypeName }` 
                where += `AND "delete_date" IS NULL`
            }
        }


        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} LIMIT ${reqLimit} OFFSET ${reqOffset};`

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

router.get('/', async (req, res) => {
    let reqQuery = req.query.filter || {};
    let user = null;
    try {
        let query = ``;
        let where = ``;
        var result;
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            result = msg.message.dataNotFound
        } else {
            let filter = JSON.parse(reqQuery)
            if (filter.workDate) {
                where = `WHERE work_date = '${filter.workDate}'`
            }
        }
        // query = `SELECT * FROM "${table}" ${where} ;`

        query = `SELECT work.work_id, work.work_date, work.work_detail, work.work_manhour, work.work_time_in, work.work_time_out,
        work.work_plan, work.work_ref, type.type_name, project.project_name, project.project_phase 
        FROM ((work 
        LEFT JOIN type ON work.type_id = type.type_id)
        LEFT JOIN project ON work.project_id = project.project_id);`

        console.log("\nTCL: query", query, '\n')
        var result = await postgresService.queryPostgrest(req, query, 'get');
        result.resultData = service.toSnakeCamelCase(result.resultData);
        for (let i = 0; i < result.resultData.length; i++) {
            const element = result.resultData[i];
            result.resultData[i].workTimeIn = moment(element.workTimeIn, 'HH:mm:ss').format('HH:mm A')
            result.resultData[i].workTimeOut = moment(element.workTimeOut, 'HH:mm:ss').format('HH:mm A')
        }
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
        let body = req.body || []
        let user = null
        let query = ``;
        let fields = `"project_id","type_id","work_date","work_detail","work_plan","work_ref","work_manhour","work_time_in","work_time_out","update_date","update_by","create_date","create_by","delete_date","delete_by"`
        var result;
        var allInsertResponse = []
        if (body && body.length > 0) {
            for (let i = 0; i < body.length; i++) {
                const element = body[i];
                let workId = element.workId.replace(/"/g, "'");
                let projectId = element.projectId.replace(/"/g, "'");
                let typeId = element.typeId.replace(/"/g, "'");
                let workDate = element.workDate.replace(/"/g, "'");
                let workDetail = element.workDetail.replace(/"/g, "'");
                let workPlan = element.workPlan ? element.workPlan.replace(/"/g, "'") : null;
                let workRef = element.workRef ? element.workRef.replace(/"/g, "'") : null;
                let workManhour = element.workManhour.replace(/"/g, "'");
                let workTimeIn = element.workTimeIn.replace(/"/g, "'");
                let workTimeOut = element.workTimeOut.replace(/"/g, "'");
                var value = `${workId},${projectId},${typeId},'${workDate}','${workDetail}','${workPlan}','${workRef}','${workManhour}','${moment(workTimeIn, 'HH:mm A').format('HH:mm:ss')}','${moment(workTimeOut, 'HH:mm A').format('HH:mm:ss')}', null, null, current_timestamp, ${user}, null, null`
                query = `INSERT INTO 
                            "${table}" 
                                (${fields}) 
                            VALUES 
                                (${value});`
                console.log("\nTCL: query -> No ", i + 1, '  ||  ', query, '\n')
                result = await postgresService.insertPostgrest(req, query, 'post');
                console.log("\nTCL: result", result, '\n')
                allInsertResponse.push(result)
            }
            await Promise.all(allInsertResponse);
            return res.json(result)
        }

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
router.delete('/:workId', async (req, res) => {
    try {

        let workId = req.params.workId || null
        let query = '';

        query = `UPDATE "${table}" SET "delete_Date" = current_timestamp, "deleteBy" = 'test_user' WHERE "work_Id" = ${workId};`
        var result = await postgresService.deletePostgrest(req, query, 'delete');
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

router.put('/:workId', async function (req, res) {
    try {

        let workId = req.params.workId || null
        let body = req.body || {}
        let projectName = body.projectName.replace(/"/g, "'");
        let typeName = body.typeName.replace(/"/g, "'");
        let workTimeIn = body.workTimeIn.replace(/"/g, "'");
        let workTimeOut = body.workTimeOut.replace(/"/g, "'");
        let workManhour = body.workManhour.replace(/"/g, "'");
        let workDetail = body.workDetail.replace(/"/g, "'");
        let workPlan = body.workPlan.replace(/"/g, "'");
        let workRef = body.workRef ? body.workRef.replace(/"/g, "'") : 'null';

        let query = '';

        query = `UPDATE "${table}" SET "project_Name" = '${projectName}', "type_Name" = '${typeName}', "work_TimeIn" = '${workTimeIn}', "work_TimeOut" = '${workTimeOut}', "work_Manhour" = '${workManhour}', "work_Detail" = '${workDetail}', "work_Plan" = '${workPlan}', "work_Ref" = '${workRef}', "updateDate" = current_timestamp, "updateBy" = 'test_user' WHERE "worktId" = ${workId};`
        console.log("TCL: query", query)
        var result = await postgresService.updatePostgrest(req, query, 'put');
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