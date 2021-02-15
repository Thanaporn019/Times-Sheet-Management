

let data = {
    "appIp": "http://localhost:5000",
    "apiUrlPrefix": "/TimeSheetManagement/Working",
    "allowedPageSizes": [10, 25, 50, 100],
    "defaultPageSize": 10,
    "fields": {
        "typeList": "typeId,typeName,typeCode,updateDate,updateBy,createDate,createBy",
        "projectList": "projectId,projectName,projectPhase,projectDetail,projectStartDate,projectEndDate,projectManDays,customerEmail,updateDate,updateBy,createDate,createBy",
        "workList": "projectId,typeId,workDate,workDetail,workPlan,workRef,workManhour,workTimeIn,workTimeOut,updateDate,updateBy,createDate,createBy"
    },
    // api: {
    //    Api: 'http://localhost:5000',
    //     work: {
    //         apidateFromdateTo: 'http://localhost:5000/TimeSheetManagement/Working/work/$dateFrom/$dateTo?limit=100&offset=0',
    //         apiYYYYMMDD: 'http://localhost:5000//TimeSheetManagement/Working/work/YYYYMMDD/YYYYMMDD?limit=100&offset=0',
    //         apiwork: 'http://localhost:5000/TimeSheetManagement/Working/work/20201201/20201231?limit=100&offset=0',
    //         apiWorkingProject: 'http://localhost:5000/TimeSheetManagement/Working/project?fields= projectName,ProjectPhase',
    //         apiWorkingType: 'http://localhost:5000/TimeSheetManagement/Working/type?fields=typeName',
    //         GETsearchWork: 'http://localhost:5000/TimeSheetManagement/Working/work/$dateFrom/$dateTo?',
    //         apiCreateGETSEARCHPROJECT: 'http://localhost:5000/TimeSheetManagement/Working/project?firlds= projectName,ProjectPhase',
    //         apiCreateGETSEARCHJOBTYPE: 'http://localhost:5000/TimeSheetManagement/Working/type?firlds=typeName',
    //         POSTinsertWork: 'http://localhost:5000/TimeSheetManagement/Working/work',
    //         apiEditGETSEARCHWORK: 'http://localhost:5000/TimeSheetManagement/Working/work?filter=(workDate=$workDate)', 
    //         apiEditGETSEARCHPROJECT: 'http://localhost:5000/TimeSheetManagement/Working/project?firlds= projectName,ProjectPhase',
    //         apiEditGETSEARCHJOBTYPE: 'http://localhost:5000/TimeSheetManagement/Working/type?firlds=typeName',
    
    //     },

    //     project: {
    //         apiSearchGETSEARCHPROJECT: 'http://localhost:5000/TimeSheetManagement/Working/project?limit=10&offset=0',
    //         DELETEdeleteProject: 'http://localhost:5000/TimeSheetManagement/Working/project/$projectId',
    //         GETsearchProject: 'http://localhost:5000/TimeSheetManagement/Working/project?',
    //         Createproject: 'http://localhost:5000/TimeSheetManagement/project/Create-project',
    //         POSTinsertProject: 'http://localhost:5000/TimeSheetManagement/Working/project',
    //         Editproject: 'http://localhost:5000/TimeSheetManagement/Project/edit-project',
    //         PUTupdateProject: 'localhost:5000/TimeSheetManagement/Working/project/$projectId',
    //         ViewProject: 'localhost:5000/TimeSheetManagement /Project/view - Project',

    //     },

    //     jobtype: {
    //         apiSearchGETsearchJobtype: 'http://localhost:5000/TimeSheetManagement/Working/type?limit=10&offset=0',
    //         DELETEdeleteJobtype: 'http://localhost:5000/TimeSheetManagement/Working/type/$typeId',
    //         GETsearchJobtype: 'http://localhost:5000/TimeSheetManagement/Working/type?',
    //         CreateJobType: 'http://localhost:5000/TimeSheetManagement/Jobtype/create-jobtype',
    //         EditJobType: 'http://localhost:5000/TimeSheetManagement/Jobtype/edit-jobtype',
    //         PUTupdateType: 'http://localhost:5000/TimeSheetManagement /Working/type/$typeId',


    //     },

    msgAlert: {
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
