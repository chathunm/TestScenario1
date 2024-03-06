const chai = require("chai")
const { expect } = chai
const { HrmUtil } = require("../../../src/core/hrm_utils")
const { HrmDashboardPage } = require("../../../src/orange_hrm_pages/hrm_dashboard_page")
const { HrmLoginPage } = require("../../../src/orange_hrm_pages/hrm_login_page")
const util = new HrmUtil()
const propertiesReader = require('properties-reader')
const path = require("path")
const properties = propertiesReader(path.join(__dirname, '../../../src/config/config.properties'))

const username = properties.get('admin_username')
const password = properties.get('admin_password_invalid')

describe('Test Objective : Validate Orange HRM Login Scenario', () => {
    let hrmLoginPage = new HrmLoginPage()
    let hrmDashboardPage = new HrmDashboardPage()

    it('should verify the orange hrm dashboard page content once user logged in with valid credentials | TC_ORG_HRM_LOGIN_01', async () => {
        /* 
        Precondition : 
        - User Credentilas
            - Username: Admin
            - Password: admin123
        - Initiate Chrome Browser Session 
        - Navigate to https://opensource-demo.orangehrmlive.com/
        
        Input 01 :
        - Fill the login form with given credentials
        - Click on Login button

        Expected Outcome 01 :
        - User logged into the application sucessfully
        - User navigates to the Dashboard Screen and displays admin panel as default view
        */

        util.printStatementWithFormat('------------------------ || TC_ORG_HRM_LOGIN_01 || ----------------------------')
        util.printStatementWithFormat('--- Input 01 -------- : User Login with specifying valid Credentials ----------')
        await hrmLoginPage.hrmLoginSuccessWithDefaults()

        util.printStatementWithFormat('--- Expected Outcome 01 ---------- : Validate Cloud Suite Dashboard Page Data -')
        expect(await hrmDashboardPage.getPageTopBarHeader()).to.equal('Dashboard')
    })

    it('should verify the login page functionality when user trying to logged in with invalid credentials | TC_ORG_HRM_LOGIN_02', async () => {
        /* 
        Precondition : 
        - User Credentilas
            - Username: Admin
            - Password: admin@123
        - Initiate Chrome Browser Session 
        - Navigate to https://opensource-demo.orangehrmlive.com/
        
        Input 01 :
        - Fill the login form with given credentials
        - Click on Login button

        Expected Outcome 01 :
        - User login action does not get success : 'Invalid credentials'
        */

        util.printStatementWithFormat('------------------------ || TC_ORG_HRM_LOGIN_02 || ----------------------------')
        util.printStatementWithFormat('--- Input 01 -------- : User Login with specifying valid Credentials ----------')
        const notification = await hrmLoginPage.hrmLoginWithOverrides(username, password, false)

        util.printStatementWithFormat('--- Expected Outcome 01 ---------- : Validate Loggin Error Notification -------')
        expect(notification).to.equal('Invalid credentials')
    })
})