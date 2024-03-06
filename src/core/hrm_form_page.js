const { Key } = require('selenium-webdriver')
const { HrmDriverBase } = require('./hrm_driver_base')

class HrmFormDataPage extends HrmDriverBase {

    async addDataToFormPage(element, value) {
        await element.click()
        await element.sendKeys(value)
        await element.sendKeys(Key.TAB)
    }

    async addDateInfoToFormPage(element, value) {
        await element.click()
        await element.sendKeys(value)
        await element.sendKeys(Key.TAB)
    }

    async updateDateInfoInFormPage(element, value) {
        await element.click()
        await element.clear()
        await element.sendKeys(value)
        await element.sendKeys(Key.TAB)
    }

    async selectDropDownOption(element, value) {
        await element.click()
        await element.sendKeys(value)
        await element.sendKeys(Key.ENTER)
        await element.sendKeys(Key.TAB)
    }

}

module.exports.HrmFormDataPage = HrmFormDataPage