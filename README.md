# TestScenario1
Deriv Skill Test - Scenario 1:  Web Automation

-----------------------------------------------------------------------
##           Readme : Orange HRM Web Automation Skill Test           ##
-----------------------------------------------------------------------

This test suite contains the solution for the Deriv QA Automation Web Automation Skill Test. 
Developed by Chathuranga Mihindukulasooriya on 05/03/2024.

Please follow the steps below to set up this test framework on your local machine:
Prerequisits : 
- Install nodejs
- Install npm

1. Download the latest WebDriver from: https://googlechromelabs.github.io/chrome-for-testing/
2. Copy this test framework to any location.
3. Open the terminal and run [npm update]. This will download all necessary libraries into the test framework.

## Running Tests
- To execute all the test scripts specified in the test_playlist.js file, run [npm test].
- To execute a selected test, add ".only" after the selected "it" block.

## Test Reports
- Test reports are saved in the mochawesome-report folder.

###### Special Notes to Reviewer ######
+ The primary goal in constructing this test framework was to ensure its accessibility for contributions from anyone, facilitating the expansion of the framework without encountering obstacles.
+ The framework is designed with robustness in mind. Reusable methods are consolidated within a common layer, while specific page object details are segregated for easier maintenance.
+ Following my standard coding practices, I've employed detailed comments to articulate the test cases effectively to all stakeholders involved.


### Summery of the Test Scripts
Test Case 1: Login Page - Authenticate Successfully
- Check the behavior with specifying valid credentials
- Check the behavior with specifying invalid credentials (additional scenario : not in scope)

Test Case 2: My Info Page - Validate Form Data Changes
- Navigate to "My Info" Page
- Verify Data in the "My Info" Page Data
- Update "Date of Birth" text field
- Verify "Date of Birth" text field value

Test Case 3: Logout - Validate Logout Functionality
- Navigate to Dashboard
- Verify Data in the "Dashboard" Page Data
- Logout
- Verify Login Page Data
