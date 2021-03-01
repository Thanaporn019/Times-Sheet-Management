const service = {};
const moment = require('moment');
let _ = require('lodash')

service.convertDateFormat = function (data, fromFormat, toFormat) {
    if (data) {
        if (!fromFormat) {
            fromFormat = 'YYYY-MM-DD HH:mm:ss';
        }

        if (!toFormat) {
            toFormat = 'YYYYMMDDHHmmssZZ';
        }


        // tslint:disable-next-line: comment-format
        // if array search value in array
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                data[i] = this.convertDateFormat(data[i], fromFormat, toFormat);
            }
        } else if (typeof data == 'object') {
            if (data instanceof Date) {
                if (moment(data, fromFormat, true).isValid()) {
                    data = moment(data, fromFormat).format(toFormat);
                }
            } else {
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] != 'resultCode' && keys[i] != 'rowCount') {
                        data[keys[i]] = this.convertDateFormat(data[keys[i]], fromFormat, toFormat);
                    }
                }

            }

        } else if (moment(data, fromFormat, true).isValid()) {
            data = moment(data, fromFormat).format(toFormat);
        } else if (data === 'null') {
            data = null;
        }

    }
    // tslint:disable-next-line: prefer-const
    let returnData = data;
    return returnData;
}


/**
 * แปลงชื่อ field ตาม db ให้เป็น camel
 * @param data 
 */
service.toSnakeCamelCase = function (data) {
    console.log("TCL: service.toSnakeCamelCase -> data", data)
    let dataArr = []
    if (data && data.length > 0) {
        for (const result of data) {
            let keys = Object.keys(result);
            let objectTemp = {}
            for (const key of keys) {
                keySearch = _.camelCase(key);
                if (_.camelCase(key) == keySearch) {
                    if (keySearch === 'projectMandays') {
                        objectTemp['projectManDays'] = result[key];
                    } else {
                        objectTemp[keySearch] = result[key];
                    }
                }
            }
            dataArr.push(objectTemp)
        }
        return dataArr;
    } else {
        return data;
    }
}


/**
 * แปลง camel >> ชื่อ field ตาม db
 * @param fields string ของ field ที่ต้องการแปลง
 */
service.toSnakeUpperCase = function (fields) {
    if (fields) {
        fields = fields.split(',')
        for (let i = 0; i < fields.length; i++) {
            const element = fields[i];
            fields[i] = _.snakeCase(element);
            if (fields[i] === 'project_man_days') {
                fields[i] = 'project_mandays'
            }
        }
        return fields.toString()
    } else {
        return '';
    }
}

// changeFields fields1,fields2,fields3 to 'fields1','fields2','fields3'
service.changeFieldSingle = function (dataFields) {
    let splitFields = dataFields.split(",");
    let mapFields = splitFields.map(x => `"${x}"`).toString();
    return mapFields;
};

module.exports = service;