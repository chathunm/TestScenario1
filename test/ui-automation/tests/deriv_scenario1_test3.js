const chai = require("chai")
const { expect } = chai
const { HrmUtil } = require("../../../src/core/hrm_utils")
const { HrmDashboardPage } = require("../../../src/orange_hrm_pages/hrm_dashboard_page")
const { HrmLoginPage } = require("../../../src/orange_hrm_pages/hrm_login_page")

describe('Test Objective : Validate Logout Functionality from the Orange HRM portal', () => {
    let hrmLoginPage = new HrmLoginPage()
    let hrmDashboardPage = new HrmDashboardPage()
    let util = new HrmUtil()

    it('should verify logout functionality when user perform "Logout" action from profile dropdown menu | TC_ORG_HRM_LOGOUT_01', async () => {
        /* 
        Input 01 :
        - Navigate to https://opensource-demo.orangehrmlive.com/ with valid Credentials

        Expected Outcome 01 :
        - User logged into the application sucessfully
        
        Input 02 :
        - User selects "Logout" option from the Profile drop down menu

        Expected Outcome 02 :
        - User successfully Logout from the application
        */

        util.printStatementWithFormat('------------------------ || TC_ORG_HRM_LOGOUT_01 || ---------------------------')
        util.printStatementWithFormat('--- Input 01 -------- : User Login with specifying valid Credentials ----------')
        await hrmLoginPage.hrmLoginSuccessWithDefaults()

        util.printStatementWithFormat('--- Expected Outcome 01 ---------- : Validate Cloud Suite Dashboard Page Data -')
        expect(await hrmDashboardPage.getPageTopBarHeader()).to.equal('Dashboard')

        util.printStatementWithFormat('--- Input 02 -------- : User Selects "Logout" option from User Dropdown Menu --')
        await hrmDashboardPage.selectUserDropDownMenuItem('Logout')
        hrmLoginPage = new HrmLoginPage()

        util.printStatementWithFormat('--- Expected Outcome 02 ---------- : Validate Logout action response ----------')
        expect(await hrmLoginPage.getPageHeader()).to.equal('Login')

    })

})