import * as testData from '../fixtures/testData.json'
import mainPageSelectors from "../support/mainPageSelectors.js"

Cypress.Commands.add('goToMainPage', () => {
    cy.visit(testData.carsMainPage, { headers: testData.acceptEncodingHeader })
})

Cypress.Commands.add('checkMainPageIsOpen', () => {
    cy.url().should('eq', testData.carsMainPage)
    cy.get(mainPageSelectors.logo).should('be.visible')
})

Cypress.Commands.add('goToResearchReviewsPage', () => {
    cy.get(mainPageSelectors.pageMenuTitles).contains(testData.testResearchLinkTitle).click()
})

Cypress.Commands.add('checkResearchReviewsPageIsOpen', () => {
    cy.url().should('contain', testData.researchPage)
    cy.get(mainPageSelectors.researchHeading).contains(testData.testResearchLinkTitle)
})