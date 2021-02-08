var { Pool, Client } = require('pg');
const moment = require('moment');
const conf = require('./config');
const service = require('./service');
async function connectPostgres(req, query, method) {
    var postgresSQL = conf.get('database');
    const pool = new Pool(postgresSQL)
    var result = {};
    try {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryResult = await client.query(query);
            result = checkResponse(queryResult, null, method)
            await client.query('COMMIT')
        } catch (err) {
            console.log("TCL: connectPostgres -> err", err)
            result = checkResponse(err, err, method)
            await client.query('ROLLBACK')
        }
        client.end();
    } catch (err) {
        result = checkResponse(err, err, method)
        console.log("TCL: connectPostgres -> err", err)
    }

    return result

}

async function queryPostgrest(req, query, method) {
    try {
        var result = await connectPostgres(req, query, method);
        // console.log("TCL: queryPostgrest -> result", result)
        return service.convertDateFormat(result, '', 'YYYY-MM-DD HH:mm:ss');
    } catch (error) {
        console.log("TCL: queryPostgrest -> error", error)
    }
}
async function queryPostgrestPaging(req, query, table) {
    try {
        var sqlQuery = "";
    } catch (error) {
        console.log("TCL: queryPostgrest -> error", error)
    }
}
async function insertPostgrest(req, query, method) {
    return new Promise(async (resolve, reject) => {
        try {
            var msg = conf.get('responseMsg');
            var result = await connectPostgres(req, query, method);
            if (result.resultCode === msg.message.success.resultCode || msg.message.dataNotFound.resultCode) {
                resolve(result)
            } else {
                reject(result)
            }
        } catch (error) {
            reject(error)
            console.log("TCL: deletePostgrest -> error", error)
        }
    });
}
async function updatePostgrest(req, query, method) {
    return new Promise(async (resolve, reject) => {
        try {
            var msg = conf.get('responseMsg');
            var result = await connectPostgres(req, query, method);
            if (result.resultCode === msg.message.success.resultCode || msg.message.dataNotFound.resultCode) {
                resolve(result)
            } else {
                reject(result)
            }
        } catch (error) {
            reject(error)
            console.log("TCL: deletePostgrest -> error", error)
        }
    });
}
async function deletePostgrest(req, query, method) {
    return new Promise(async (resolve, reject) => {
        try {
            var msg = conf.get('responseMsg');
            var result = await connectPostgres(req, query, method);
            if (result.resultCode === msg.message.success.resultCode || msg.message.dataNotFound.resultCode) {
                resolve(result)
            } else {
                reject(result)
            }
        } catch (error) {
            reject(error)
            console.log("TCL: deletePostgrest -> error", error)
        }
    });
}

async function checkResponse(rawResult, err, method) {
    var msg = conf.get('responseMsg');
    if (err) {
        console.log("TCL: checkResponse -> err", err)
    } else {
        var statusNomal = true;
        var result = "";
        var returnData;
        switch (method) {
            case 'get':
                if (rawResult.rowCount == 0) {
                    result = msg.message.dataNotFound
                    statusNomal = false;
                }
                break;
            case 'post':
                break;
            case 'put':
                if (rawResult.rowCount == 0) {
                    result = msg.message.dataNotFound
                    statusNomal = false;
                }
                break;
            case 'delete':
                if (rawResult.rowCount == 0) {
                    result = msg.message.dataNotFound
                    statusNomal = false;
                }
                break;
        }

        if (statusNomal) {
            result = msg.message.success
        }

        // console.log("TCL: checkResponse -> method", method)
        // console.log("TCL: checkResponse -> rawResult", rawResult.rows)
        if (method === 'get') {
            returnData = await responseData(result, rawResult.rows)
        } else {
            returnData = await responseData(result)
        }
        // console.log("TCL: checkResponse -> returnData", returnData)
        return returnData;
    }
}

function responseData(msg, data) {
    // console.log("TCL: responseData -> data", data)
    var returnData = {
        resultCode: msg.resultCode,
        resultDescription: msg.resultDescription
    }

    if (data)
        returnData.resultData = data;

    return returnData
}

module.exports = {
    queryPostgrest,
    queryPostgrestPaging,
    insertPostgrest,
    updatePostgrest,
    deletePostgrest
};