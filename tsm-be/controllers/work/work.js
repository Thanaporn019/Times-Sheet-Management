let moment = require('moment')
const express = require('express');
const router = express.Router();
let postgresService = require('../../utils/postgresSQL')
const table = 'Work'
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
        let sqlWorkProjectName = ``;
        let sqlWorkJobType = ``;
        let sqlWorkDateFrom = ``;
        let sqlWorkDateTo = ``;
        if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object) {
            sqlWorkProjectName = ``;
            sqlWorkJobType = ``;
            sqlWorkDateFrom = ``;
            sqlWorkDateTo = ``;
        } else {
            let filter = reqQuery.split(',')
            for (const iterator of filter) {
                let data = iterator.split('=')
                if (data[0] === 'WorkProjectName') {
                    sqlWorkName = `LOWER("WorkProjectName") LIKE LOWER('%${data[1]}%')`
                }
                if (data[0] === 'WorkJobType') {
                    sqlWorkJobType = `LOWER("WorkJobType") LIKE LOWER('%${data[1]}%')`
                }
                if (data[0] === 'WorkDateFrom') {
                    sqlWorkDateFrom = `LOWER("WorkDateFrom") LIKE LOWER('%${data[1]}%')`
                }

                if (data[0] === 'WorkDateTo') {
                    sqlWorkDateTo = `LOWER("WorkDateTo") LIKE LOWER('%${data[1]}%')`
                }
            }
        }
        let fieldsSql = ``
        for (const iterator of fields) {
            fieldsSql += `"${iterator}",`
        }
        fieldsSql = fieldsSql.slice(0, fieldsSql.length - 1)
        if (sqlWorkProjectName !== '' && sqlWorkJobType !== '' && sqlWorkDateFrom !== '' && sqlWorkDateTo !== '') {
            where = `WHERE ${sqlWorkProjectName} AND ${sqlWorkJobType} AND ${sqlWorkDateFrom} AND ${sqlWorkDateTo}`
        } else {
            where = `WHERE ${sqlWorkProjectName !== '' ? sqlWorkProjectName : sqlWorkJobType} AND ${sqlWorkJobType !== '' ? sqlWorkJobType : sqlWorkDateFrom} AND ${sqlWorkDateFrom !== '' ? sqlWorkDateFrom : sqlWorkDateTo}`
        }
        query = `SELECT ${fieldsSql} FROM "${table}" ${where} ${orderby} LIMIT ${reqLimit} OFFSET ${reqOffset};`
        var result = await postgresService.queryPostgrest(req, query, 'post');
        return res.json(result)
    } catch (error) {
        console.log("TCL: error", error)
    }



});

router.post('/', async (req, res) => {
    try {

        // let body = req.body || {}
        // let WorkprojectName = body.WorkprojectName.replace(/"/g, "'");
        // let WorkJobtype = body.WorkJobtype.replace(/"/g, "'");
        // let WorkTimein = body.WorkTimein.replace(/"/g, "'");
        // let WorkTimeout = body.WorkTimeout.replace(/"/g, "'");
        // let WorkManhours = body.WorkManhours.replace(/"/g, "'");
        // let WorkDetail = body.WorkDetail.replace(/"/g, "'");
        // let WorkLinkplan = body.WorkLinkplan.replace(/"/g, "'");
        // let WorkReference = body.WorkReference ? body.WorkReference.replace(/"/g, "'") : 'null';
        
        // query = `INSERT INTO "${table}" ("WorkprojectName", "WorkJobtype", "WorkTimein", "WorkTimeout", "WorkManhours", "WorkDetail", "WorkLinkplan", "WorkReference") 
        //                          VALUES ('${WorkprojectName}', '${WorkJobtype}', '${WorkTimein}', '${WorkTimeout}', '${WorkManhours}', '${WorkDetail}', '${WorkLinkplan}','${WorkReference}', null, null, current_timestamp, 'test_user', null, null);`
        // console.log("TCL: query", query)
        // var result = await postgresService.insertPostgrest(req, query, 'post');
        // return res.json(result)

    } catch (error) {
        console.log("TCL: error", error)
    }
});
router.delete('/:typeId', async (req, res) => {
    try {

        // let workId = req.params.workId || null
        // let query = '';
      
        // query = `UPDATE "${table}" SET "deleteDate" = current_timestamp, "deleteBy" = 'test_user' WHERE "worktId" = ${workId};`
        // var result = await postgresService.deletePostgrest(req, query, 'delete');
        // return res.json(result)

    } catch (error) {
        console.log("TCL: error", error)
    }
});

router.put('/:typeId', async function (req, res) {
    try {

        // let workId = req.params.workId || null
        // let body = req.body || {}
        // let WorkprojectName = body.WorkprojectName.replace(/"/g, "'");
        // let WorkJobtype = body.WorkJobtype.replace(/"/g, "'");
        // let WorkTimein = body.WorkTimein.replace(/"/g, "'");
        // let WorkTimeout = body.WorkTimeout.replace(/"/g, "'");
        // let WorkManhours = body.WorkManhours.replace(/"/g, "'");
        // let WorkDetail = body.WorkDetail.replace(/"/g, "'");
        // let WorkLinkplan = body.WorkLinkplan.replace(/"/g, "'");
        // let WorkReference = body.WorkReference ? body.WorkReference.replace(/"/g, "'") : 'null';

        // let query = '';
      
        // query = `UPDATE "${table}" SET "WorkprojectName" = '${WorkprojectName}', "WorkJobtype" = '${WorkJobtype}', "WorkTimein" = '${WorkTimein}', "WorkTimeout" = '${WorkTimeout}', "WorkManhours" = '${WorkManhours}', "WorkDetail" = '${WorkDetail}', "WorkLinkplan" = '${WorkLinkplan}', "WorkReference" = '${WorkReference}', "updateDate" = current_timestamp, "updateBy" = 'test_user' WHERE "worktId" = ${workId};`
        // console.log("TCL: query", query)
        // var result = await postgresService.updatePostgrest(req, query, 'put');
        // return res.json(result)

    } catch (error) {
        console.log("TCL: error", error)
    }
});
module.exports = router;