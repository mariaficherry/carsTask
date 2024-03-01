import * as testData from '../fixtures/testData.json'

describe('Cars functionality test', () => {

  beforeEach(() => {
    cy.visit('/', {headers: {"Accept-Encoding": "gzip, deflate"}})
  })

  it('comparison for two cars can be performed', () => {
    cy.checkMainPageIsOpen()

    cy.goToResearchReviewsPage()

    cy.checkResearchReviewsPageIsOpen()

    cy.selectRandomCharacteristics(testData.car1OptionsFile)

    cy.checkOptionsAreSelected()

    cy.clickResearchButton()

    cy.checkPageWithCarDescriptionOpens(testData.optionsCar1FilePath)

    cy.selectBasicTrim()

    cy.storeCarCharacteristics(testData.car1CharacterisitcsFile)

    cy.goToMainPage()

    cy.checkMainPageIsOpen()

    cy.goToResearchReviewsPage()

    cy.checkResearchReviewsPageIsOpen()

    cy.selectRandomCharacteristics(testData.car2OptionsFile)

    cy.checkOptionsAreSelected()

    cy.clickResearchButton()

    cy.checkPageWithCarDescriptionOpens(testData.optionsCar2FilePath)

    cy.selectBasicTrim()

    cy.storeCarCharacteristics(testData.car2CharacteristicsFile)

    cy.goToResearchReviewsPage()

    cy.checkResearchReviewsPageIsOpen()

    cy.goToCompareTwoCarsLink()

    cy.checkComparePageIsOpen()

    cy.addCar1Characteristics(testData.car1OptionsFile)

    cy.addCar2Characteristics(testData.car2OptionsFile)

    cy.clickComparisonButton()

    cy.checkCharacteristicsOnComparePage(testData.car1OptionsFile)
  })
})