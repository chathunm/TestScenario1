const { HrmFormDataPage } = require("../core/hrm_form_page")
const { HrmUtil } = require("../core/hrm_utils")

class HrmMyInfoPage extends HrmFormDataPage {

    async getMyInfoPageDetails() {
        const util = new HrmUtil()
        const page_header = await util.getTextByXPath('//*[contains(@class,"oxd-topbar-header-breadcrumb-module")]')
        return page_header
    }

    async isFiledNameExist(fieldName) {
        const util = new HrmUtil()
        try {
            await util.isElementVisibleByXpath('//*[contains(@class,"oxd-label")][text()="' + fieldName + '"]')
            console.log('Field with Field Name : "' + fieldName + '" is exists in the My Info Page')
            return true
        } catch (NoSuchElementError) {
            return false
        }
    }

    async saveChangesBySectionName(sectionName) {
        const util = new HrmUtil()
        //sectionName = 'Personal Details' / 'Custom Fields' --> Personal Details Page and 'Contact Details' --> Contact Details Page
        await util.clickElementByXPath('//*[contains(@class,"orangehrm-main-title")][text()="' + sectionName + '"]//parent::div//button[@type="submit"]')
        const xpath = '//*[contains(@class,"oxd-text--toast-message oxd-toast-content-text")]'
        const notification = await util.getTextByXPath(xpath)
        return notification
    }

    async addDataToFormPage(fieldName, value) {
        const util = new HrmUtil()
        const element = await util.findElementByXpath('//*[text()="' + fieldName + '"]//parent::div//following-sibling::div//input')
        await super.addDataToFormPage(element, value)
        console.log('Data Added to Field Name : ' + fieldName + ' | Value : ' + value)
    }

    async addDateInfoToFormPage(fieldName, value) {
        const util = new HrmUtil()
        const xpath = '//*[text()="' + fieldName + '"]//parent::div//following-sibling::div//input'
        const element = await util.findElementByXpath(xpath)
        await util.clearDataByXpath(xpath)
        await super.addDateInfoToFormPage(element, value)
        console.log('Data Added to Field Name : "' + fieldName + '" | Value : "' + value + '"')
    }

    async getFieldDataByFieldName(fieldName) {
        const util = new HrmUtil()
        await util.waitUntilLoadComplete()
        const xpath = '//*[text()="' + fieldName + '"]//parent::div//following-sibling::div//input'
        const fieldValue = await util.getPropertyValueByXPath(xpath, 'value')
        console.log('Field Name : "' + fieldName + '" | Field Value : "' + fieldValue + '"')
        return fieldValue
    }

}

module.exports.HrmMyInfoPage = HrmMyInfoPage