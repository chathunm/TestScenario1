const { HrmUtil } = require('../../../src/core/hrm_utils')
const { HrmDashboardPage } = require('../../../src/orange_hrm_pages/hrm_dashboard_page')
const { HrmLoginPage } = require('../../../src/orange_hrm_pages/hrm_login_page')
const { HrmBasePage } = require('../../../src/orange_hrm_pages/hrm_base_page')

let hrmBasePage = new HrmBasePage()
let hrmLoginPage = new HrmLoginPage()
let hrmDashboardPage = new HrmDashboardPage()

const username_xpath = '//*[@name="username"]'
const password_xpath = '//*[@name="password"]'

// ******* Enable the following code block if running multiple test scripts in this suite to ensure Dashboard access before starting each test script
// For these tests, only enable line #21 and perform testing

beforeEach('Navigate to Orange HRM Login Page', async () => {
    const util = new HrmUtil()
    await hrmBasePage.navigateToOrangeHrmLoginPage()

    // await util.waitUntilElementVisibleByXPath(username_xpath)
    // await util.waitUntilElementVisibleByXPath(password_xpath)
    // await hrmLoginPage.hrmLoginSuccessWithDefaults()
    // await util.waitUntilElementVisibleByXPath('//*[contains(@class,"oxd-topbar-header-breadcrumb-module")][text()="Dashboard"]')
    // return new HrmDashboardPage()
})

// ******* Enable the following code block if running multiple test scripts in this suite to ensure user will navigates to login page after each test script

afterEach('Logout from the Orange HRM Dashboard Page', async () => {
    try {
        await hrmDashboardPage.selectUserDropDownMenuItem('Logout')
    } catch (NoSuchElementError) {
        console.log('User already Logged out from the application')
    }
})