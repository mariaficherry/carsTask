import comparePageSelectors from "../support/comparePageSelectors.js"
import * as testData from '../fixtures/testData.json'

Cypress.Commands.add('checkComparePageIsOpen', () => {
    cy.url().should('contain', testData.comparePage)
    cy.get(comparePageSelectors.comparePageTitle).should('be.visible')
})

Cypress.Commands.add('addCar1Characteristics', (options) => {
    cy.get(comparePageSelectors.addCar1MakeMenu).select(options.make).then(() => {
        cy.get(comparePageSelectors.addCar1ModelMenu).select(options.model)
        cy.get(comparePageSelectors.addCar1YearMenu).select(options.year)
    })
})

Cypress.Commands.add('addCar2Characteristics', (options) => {
    cy.get(comparePageSelectors.addCar2MakeMenu).select(options.make).then(() => {
        cy.get(comparePageSelectors.addCar2ModelMenu).select(options.model)
        cy.get(comparePageSelectors.addCar2YearMenu).select(options.year)
    })
})

Cypress.Commands.add('clickComparisonButton', () => {
    cy.get(comparePageSelectors.comparisonButton).click()
})

Cypress.Commands.add('checkCharacteristicsOnComparePage', (options) => {
    cy.get(comparePageSelectors.carComparisonPage)
        .should('contain', options.make)
        .should('contain', options.model)
        .should('contain', options.year)
})

Cypress.Commands.add('compareCarCharacteristics', (car1Info, car2Info) => {
    const carInfos = [car1Info, car2Info]
    cy.get(comparePageSelectors.compareCarCharacteristics).each(($element) => {
        const elementContent = $element.text().trim()
        carInfos.forEach((carInfo) => {
            const dataValues = Object.values(carInfo)
            const isMatch = dataValues.some(value => {
                const regex = new RegExp(value.replace(/\s+/g, '\\s+'), 'i')
                return regex.test(elementContent)
            })
        })
    })
})