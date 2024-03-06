const chai = require("chai")
const { expect } = chai
const { HrmUtil } = require("../../../src/core/hrm_utils")
const { HrmDashboardPage } = require("../../../src/orange_hrm_pages/hrm_dashboard_page")
const { HrmLoginPage } = require("../../../src/orange_hrm_pages/hrm_login_page")
const { HrmMyInfoPage } = require("../../../src/orange_hrm_pages/hrm_my_info_page")

describe('Test Objective : Validate My Info Page Details', () => {
    let hrmLoginPage = new HrmLoginPage()
    let hrmDashboardPage = new HrmDashboardPage()
    let hrmMyInfoPage = new HrmMyInfoPage()
    let util = new HrmUtil()

    it('should verify the My Info page details after updating "Date of Birth" field | TC_ORG_HRM_INFO_01', async () => {
        /* 
        Input 01 :
        - Navigate to https://opensource-demo.orangehrmlive.com/ with valid Credentials

        Expected Outcome 01 :
        - User logged into the application sucessfully
        
        Input 02 :
        - Navigate to "My Info" Page

        Expected Outcome 02 :
        - Verify Data in the "My Info" Page
                
        Input 03 :
        - Update "Date of Birth" text field

        Expected Outcome 03 :
        - Verify "Date of Birth" text field value
        */

        util.printStatementWithFormat('------------------------ || TC_ORG_HRM_INFO_01 || -----------------------------')
        util.printStatementWithFormat('--- Input 01 -------- : User Login with specifying valid Credentials ----------')
        await hrmLoginPage.hrmLoginSuccessWithDefaults()

        util.printStatementWithFormat('--- Expected Outcome 01 ---------- : Validate Cloud Suite Dashboard Page Data -')
        expect(await hrmDashboardPage.getPageTopBarHeader()).to.equal('Dashboard')

        util.printStatementWithFormat('--- Input 02 -------- : User Navigates to "My Info" Menu Item -----------------')
        hrmMyInfoPage = await hrmDashboardPage.navigateToMenuItem('My Info')

        util.printStatementWithFormat('--- Expected Outcome 02 ---------- : Validate "My Info" Page Data -------------')
        expect(await hrmMyInfoPage.getMyInfoPageDetails()).to.equal('PIM')
        expect(await hrmMyInfoPage.isFiledNameExist('Employee Id')).to.equal(true)
        expect(await hrmMyInfoPage.isFiledNameExist('Employee Full Name')).to.equal(true)
        expect(await hrmMyInfoPage.isFiledNameExist('Nationality')).to.equal(true)
        expect(await hrmMyInfoPage.isFiledNameExist('Date of Birth')).to.equal(true)

        util.printStatementWithFormat('--- Input 03 -------- : User Edit Date of Birth -------------------------------')
        await hrmMyInfoPage.addDateInfoToFormPage('Date of Birth', '1985-10-07')
        const notification = await hrmMyInfoPage.saveChangesBySectionName('Personal Details')
        await util.waitUntilLoadComplete()

        util.printStatementWithFormat('--- Expected Outcome 03 ---------- : Validate "My Info" Page Data -------------')
        expect(notification).to.equal('Successfully Updated')
        expect(await hrmMyInfoPage.isFiledNameExist('Date of Birth')).to.equal(true)
        expect(await hrmMyInfoPage.getFieldDataByFieldName('Date of Birth')).to.equal('1985-10-07')
    })

})