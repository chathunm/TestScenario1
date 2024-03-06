const { SeleniumDriver } = require('./driver')

class HrmDriverBase {

    constructor() {
        SeleniumDriver.getInstance()
    }

    getDriver() {
        return SeleniumDriver.getInstance().driver
    }

    async navigateToUrl(url) {
        const driver = await this.getDriver()
        driver.manage().window().maximize()
        await driver.get(url)
    }
}

module.exports.HrmDriverBase = HrmDriverBase