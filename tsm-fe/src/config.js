

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
            validWorkDate: "Please select a working day",
            validProjectName: "Please select a ProjectName",
            validJobType: "Please select a JopTypeName",
            validTimeIn: "Please select a workTimeIn",
            validTimeOut: "Please select a workTimeOut",
            validManHours: "Please click a Calculater manhour",
            validWorkDetail: "Please select a workDetail",
            validTimeInAndOut: "Please select a WorkTimeIn and WorkTimeOut",
        },
        project: {
            validEmail: "You entered the email incorrectly.",
        }
    }
}
module.exports = data;
