

let data = {
    "appIp": "http://localhost:5000",
    "apiUrlPrefix": "/TimeSheetManagement/Working",
    "allowedPageSizes": [10, 25, 50, 100],
    "defaultPageSize": 10,
    "fields": {
        "typeList": "typeId,typeName,typeCode,updateDate,updateBy,createDate,createBy",
        "projectList": "projectId,projectName,projectPhase,projectDetail,projectStartDate,projectEndDate,projectManDays,customerEmail,updateDate,updateBy,createDate,createBy",
        "workList": "workId,projectId,typeId,workDate,workDetail,workPlan,workRef,workManhour,workTimeIn,workTimeOut,updateDate,updateBy,createDate,createBy"
    },msgAlert: {
        updated: 'Your data has been updated successfully.',
        saved: 'Your data has been saved successfully.',
        deleted: 'Your data has been deleted successfully.',
        systemError: 'Please contact your administrator.',
    },
    msgConfirm: {
        saved: 'Please confirm your configuration.',
        deleted: 'Are you sure you want to delete this?',
    },
    validDateFill: {
        req: "Please fill in the information.",
        work: {
            validWorkDate: "Please fill in the information.",
            validWorkDateEdit: "Please fill in the information.",
            validProjectName: "Please fill in the information.",
            validJobType: "Please fill in the information.",
            validTimeIn: "Please fill in the information.",
            validTimeOut: "Please fill in the information.",
            validManHours: "Please click a time in and time out.",
            validWorkDetail: "Please fill in the information.",
            validTimeInmoreTimeOut: "The time in must be less than the time out.",
            validTimeOutlessTimeIn: "The time out must be greater than the time in.",
        },
        project: {
            validEmail: "You entered the email incorrectly.",
            // validStartDate: "Please fill in the information.",
            // validEndDate: "Please fill in the information.",
            validStartDatemoreEndDate: "The start date must be less than the end date.",
            validEndDatelessStartDate: "The end date must be greater than the start date.",
        
            
        },
        // jobtype: {
        //     validJobTypeName: "Please fill in the information.",
        //     validCode: "Please fill in the information.",
        // }
    }
}
// }
module.exports = data;
