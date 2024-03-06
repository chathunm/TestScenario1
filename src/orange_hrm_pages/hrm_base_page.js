
const propertiesReader = require('properties-reader')
const path = require("path")
const properties = propertiesReader(path.join(__dirname, '../config/config.properties'))
const chalk = require('chalk')

const { HrmDriverBase } = require("../core/hrm_driver_base")
const { HrmLoginPage } = require("./hrm_login_page")

const browser = properties.get('browser')
const url = properties.get('url')
const hrm_driver_base = new HrmDriverBase()

class HrmBasePage {

    async navigateToOrangeHrmLoginPage() {
        await hrm_driver_base.navigateToUrl(url)
        console.log(chalk.green('Browser : ' + browser))
        console.log(chalk.green('Navigating to Orange HRM Login Page Url : ' + url))
        return new HrmLoginPage()
    }
}

module.exports.HrmBasePage = HrmBasePage