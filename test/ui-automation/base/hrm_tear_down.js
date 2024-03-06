const propertiesReader = require('properties-reader')
const path = require("path")
const { HrmDriverBase } = require("../../../src/core/hrm_driver_base")
const properties = propertiesReader(path.join(__dirname, '../../../src/config/config.properties'))
const browser = properties.get('browser')

after(async () => {
    const driverBase = new HrmDriverBase()
    const driver = await driverBase.getDriver(browser)
    if (driver != null) {
        driver.quit()
    }
    console.log('--- Tear Down Activity ------- : Browser Session Terminated ----------')
})