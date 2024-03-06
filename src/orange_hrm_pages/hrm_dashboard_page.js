const { HrmUtil } = require("../core/hrm_utils")
const { HrmMyInfoPage } = require("./hrm_my_info_page")

class HrmDashboardPage {

    async openUserDropDown() {
        const util = new HrmUtil()
        await util.clickElementByXPath('//*[@class="oxd-userdropdown-name"]')
    }

    async selectUserDropDownMenuItem(menuItem) {
        const util = new HrmUtil()
        await this.openUserDropDown()
        await util.clickElementByXPath('//*[@class="oxd-dropdown-menu"]//li//a[text()="' + menuItem + '"]')

        switch (menuItem) {
            case 'About':
                console.log('Page Objects are not written for "About" Sub Window')
                break
            case 'Support':
                console.log('Page Objects are not written for "Support" Window')
                break
            case 'Change Password':
                console.log('Page Objects are not written for "Change Password" Window')
                break
            case 'Logout':
                await util.waitUntilElementVisibleByXPath('//*[contains(@class,"orangehrm-login-title")][text()="Login"]')
            default:
                console.log('Specified Menu Item Not Available')
                break
        }
    }

    async navigateToMenuItem(menuItem) {
        const util = new HrmUtil()
        await util.clickElementByXPath('//*[@class="oxd-main-menu-item-wrapper"]//span[text()="' + menuItem + '"]')
        console.log('User Trying to Navigates to the "' + menuItem + '" Menu Item')

        switch (menuItem) {
            case 'My Info':
                return new HrmMyInfoPage()
            case 'Dashboard':
                return this

            //Didn't consider other Menu Item options since those DOMs are out of scope
            default:
                console.log('Specified Menu Item Not Available')
                break
        }
    }

    async getPageTopBarHeader() {
        const util = new HrmUtil()
        return await util.getTextByXPath('//*[contains(@class,"oxd-topbar-header-breadcrumb-module")]')
    }

}



module.exports.HrmDashboardPage = HrmDashboardPage