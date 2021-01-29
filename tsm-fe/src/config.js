

let data = {
    api: '',
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
            validTimeInmoreTimeOut: "The TimeIn must be less than the TimeOut.",
            validTimeOutlessTimeIn: "The TimeOut must be greater than the TimeIn.",
        },
        project: {
            validEmail: "You entered the email incorrectly.",
        }
    }
}
module.exports = data;
