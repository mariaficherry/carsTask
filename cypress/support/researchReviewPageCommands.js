import researchReviewPageSelectors from "../support/researchReviewPageSelectors.js"

Cypress.Commands.add('selectRandomCharacteristics', () => {
    const options = {}

    cy.selectRandomOption(researchReviewPageSelectors.makeMenuOption, researchReviewPageSelectors.makeMenu)
        .then(text => {
            options.make = text
            return text
        })
        .then(() => cy.selectRandomOption(researchReviewPageSelectors.modelMenuOption, researchReviewPageSelectors.modelMenu))
        .then(text => {
            options.model = text
            return text
        })
        .then(() => cy.selectRandomOption(researchReviewPageSelectors.yearMenuOption, researchReviewPageSelectors.yearMenu))
        .then(text => {
            options.year = text
            return text
        })
    return cy.wrap(options)
})

Cypress.Commands.add('checkOptionsAreSelected', () => {
    cy.get(researchReviewPageSelectors.noOptionSelectedInMakeMenu).should('not.exist')
})

Cypress.Commands.add('clickResearchButton', () => {
    cy.get(researchReviewPageSelectors.researchButton).click()
})

Cypress.Commands.add('checkPageWithCarDescriptionOpens', (options) => {
    cy.get(`${researchReviewPageSelectors.selectedOptionsTitle1}, ${researchReviewPageSelectors.selectedOptionsTitle2}`)
        .contains(options.make)
        .should('be.visible')
})

Cypress.Commands.add('goToCompareTwoCarsLink', () => {
    cy.get(researchReviewPageSelectors.compareTwoCars).click()
})