const service = {};
const moment = require('moment');

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


module.exports = service;