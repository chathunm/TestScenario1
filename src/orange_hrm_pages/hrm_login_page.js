const { HrmUtil } = require('../core/hrm_utils')
const { HrmDashboardPage } = require('./hrm_dashboard_page')
const propertiesReader = require('properties-reader')
const path = require("path")
const properties = propertiesReader(path.join(__dirname, '../config/config.properties'))
const chalk = require('chalk')

const def_username = properties.get('admin_username')
const def_password = properties.get('admin_password')
const username_xpath = '//*[@name="username"]'
const password_xpath = '//*[@name="password"]'

class HrmLoginPage {

    async hrmLoginSuccessWithDefaults() {
        const util = new HrmUtil()
        await util.waitUntilElementVisibleByXPath('//*[contains(@class,"orangehrm-login-title")][text()="Login"]')
        await util.clearByXpath(username_xpath)
        await util.clearByXpath(password_xpath)
        await util.setElementTextByXPath(username_xpath, def_username)
        await util.setElementTextByXPath(password_xpath, def_password)
        await util.clickElementByXPath('//*[@type="submit"]')
        console.log('User "' + def_username + '" Logged in to Orange HRM Dashboard Page Successfully')
        await util.waitUntilElementVisibleByXPath('//*[contains(@class,"oxd-topbar-header-breadcrumb-module")][text()="Dashboard"]')
        return new HrmDashboardPage()
    }

    async hrmLoginWithOverrides(username, password, isLoginSuccess = true) {
        const util = new HrmUtil()
        await util.waitUntilElementVisibleByXPath('//*[contains(@class,"orangehrm-login-title")][text()="Login"]')
        await util.clearByXpath(username_xpath)
        await util.clearByXpath(password_xpath)
        await util.setElementTextByXPath(username_xpath, username)
        await util.setElementTextByXPath(password_xpath, password)
        await util.clickElementByXPath('//*[@type="submit"]')

        const logMessage = isLoginSuccess
            ? `User "${username}" Logged in to Orange HRM Dashboard Page Successfully`
            : `User "${username}" Login action failed with: ${await util.getTextByXPath('//*[contains(@class,"oxd-alert-content-text")]')}`

        console.log(isLoginSuccess ? chalk.green(logMessage) : chalk.red(logMessage))
        return isLoginSuccess ? new HrmDashboardPage() : await util.getTextByXPath('//*[contains(@class,"oxd-alert-content-text")]')
    }

    async getPageHeader() {
        const util = new HrmUtil()
        const pageHeader = await util.getTextByXPath('//*[contains(@class,"orangehrm-login-title")]')
        console.log('Page Header : ' + pageHeader)
        return pageHeader
    }
    
}

module.exports.HrmLoginPage = HrmLoginPage