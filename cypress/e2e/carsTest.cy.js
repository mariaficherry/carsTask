describe('Cars functionality test', () => {
  beforeEach(() => {
    cy.goToMainPage()
  })

  it('comparison for two cars can be performed', () => {
    cy.checkMainPageIsOpen()
    cy.goToResearchReviewsPage()
    cy.checkResearchReviewsPageIsOpen()
    cy.selectRandomCharacteristics().then((options1) => {
      cy.checkOptionsAreSelected()
      cy.clickResearchButton()
      cy.checkPageWithCarDescriptionOpens(options1)
      cy.selectBasicTrim()
      cy.storeCarCharacteristics().then((carInfo1) => {
        cy.goToMainPage()
        cy.checkMainPageIsOpen()
        cy.goToResearchReviewsPage()
        cy.checkResearchReviewsPageIsOpen()
        cy.selectRandomCharacteristics().then((options2) => {
          cy.checkOptionsAreSelected()
          cy.clickResearchButton()
          cy.checkPageWithCarDescriptionOpens(options2)
          cy.selectBasicTrim()
          cy.storeCarCharacteristics().then((carInfo2) => {
            cy.goToResearchReviewsPage()
            cy.checkResearchReviewsPageIsOpen()
            cy.goToCompareTwoCarsLink()
            cy.checkComparePageIsOpen()
            cy.addCar1Characteristics(options1)
            cy.addCar2Characteristics(options2)
            cy.clickComparisonButton()
            cy.checkCharacteristicsOnComparePage(options1)
            cy.compareCarCharacteristics(carInfo1, carInfo2)
          })
        })
      })
    })
  })
})