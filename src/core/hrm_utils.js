const { By, until, Key } = require('selenium-webdriver')
const { HrmDriverBase } = require('./hrm_driver_base')
const hrm_var = require('./hrm_variable')
const chalk = require('chalk')

const sec5_wait = hrm_var.FIVE_SEC_WAIT
const milli_sec100_wait = hrm_var.MILLI_SEC_100_WAIT

class HrmUtil extends HrmDriverBase {

    async findElementById(id) {
        const driver = await this.getDriver()
        return await driver.findElement(By.id(id))
    }

    async findElementByXpath(xpath) {
        const driver = await this.getDriver()
        const element = await driver.wait(until.elementLocated(By.xpath(xpath)), sec5_wait)
        await driver.wait(until.elementIsVisible(element))
        return await driver.findElement(By.xpath(xpath))
    }

    async setElementTextById(id, text) {
        const element = await this.findElementById(id)
        await element.click()
        await element.sendKeys(text)
    }

    async setElementTextByXPath(xpath, text) {
        const element = await this.findElementByXpath(xpath)
        await element.click()
        await element.sendKeys(text)
    }

    async clearByXpath(xpath) {
        const element = await this.findElementByXpath(xpath)
        await element.click()
        await element.sendKeys(Key.CONTROL + "a")
        await element.sendKeys(Key.DELETE)

    }

    async clickElementById(id) {
        const element = await this.findElementById(id)
        await element.click()
    }

    async clickElementByXPath(xpath) {
        const element = await this.findElementByXpath(xpath)
        await element.click()
    }

    async waitUntilElementVisibleById(id) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsVisible(await this.findElementById(id)), sec5_wait)
    }

    async waitUntilElementVisibleByXPath(xpath) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsVisible(await this.findElementByXpath(xpath)), sec5_wait)
    }

    async getTextById(className) {
        const element = await this.findElementById(className)
        return element.getText()
    }

    async getTextByXPath(xpath) {
        const element = await this.findElementByXpath(xpath)
        return element.getText()
    }

    async getPropertyValueByXPath(xpath, propertyName) {

        const element = await this.retryFindElementByXpath(xpath)
        return await element.getAttribute(propertyName)
    }

    async waitUntilTextChangeTo(element, text) {
        const driver = await this.getDriver()
        await driver.wait(until.elementTextMatches(element, text), milli_sec100_wait)
    }

    async waitUntilTextChangeInElement(element, text) {
        const driver = await this.getDriver()
        await driver.wait(until.elementTextIs(element, text))
    }

    async isElementVisible(className) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsNotVisible(await this.findElementByClassName(className)), milli_sec100_wait)
    }

    async isElementVisibleByXpath(xpath) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsVisible(await this.findElementByXpath(xpath)), milli_sec100_wait)
    }

    async isElementNotVisibleByXpath(xpath) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsNotVisible(await this.findElementByXpath(xpath)), milli_sec100_wait)
    }

    async printStatementWithFormat(statement) {
        console.log(chalk.black.bold.bgWhite(statement))
    }

    async clearDataByXpath(xpath) {
        const element = await this.findElementByXpath(xpath)
        await element.click()
        await element.sendKeys(Key.CONTROL + "a")
        await element.sendKeys(Key.DELETE)
    }

    async waitUntilElementNotVisibleByXpath(xpath) {
        const driver = await this.getDriver()
        await driver.wait(until.elementIsNotVisible(await this.findElementByXpath(xpath)), sec5_wait)
    }

    async retryFindElementByXpath(xpath, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const element = await this.findElementByXpath(xpath)
                return element
            } catch (error) {
                if (error instanceof StaleElementReferenceError) {
                    console.log('Stale element reference error occurred. Retrying...')
                } else {
                    throw error
                }
            }
        }
        throw new Error('Element not found after multiple retries')
    }

    async waitUntilLoadComplete() {
        const driver = await this.getDriver()
        await driver.wait(async () => {
            const readyState = await driver.executeScript('return document.readyState')
            return readyState === 'complete'
        })
    }
    
}

module.exports.HrmUtil = HrmUtil