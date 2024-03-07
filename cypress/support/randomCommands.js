import { getRandomInt } from '../utils/randomFunctions'
import * as testData from '../fixtures/testData.json'

Cypress.Commands.add('selectRandomOption', (optionSelector, menuSelector) => {
    return cy.get(optionSelector).then($listing => {
        const randomNumber = getRandomInt(testData.minIndex, $listing.length - testData.maxIndex)
        return cy.get(optionSelector)
            .eq(randomNumber)
            .invoke('text')
            .then(text => {
                return cy.get(menuSelector).select(text).then(() => text)
            })
    })
})