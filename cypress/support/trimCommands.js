import trimSelectors from "../support/trimSelectors.js"
import * as testData from '../fixtures/testData.json'

Cypress.Commands.add('selectBasicTrim', () => {
    cy.get(trimSelectors.trimOptions).children().eq(testData.firstTrim).find(trimSelectors.linkTag).click()
})

Cypress.Commands.add('storeCarCharacteristics', () => {
    const carInfo = {}

    cy.get(trimSelectors.carCharacteristics)
        .contains(testData.doorCharacteristic)
        .then(($element) => {
            carInfo.door = $element.text().trim()
        })
    cy.get(trimSelectors.carCharacteristics)
        .contains(testData.seatCharacteristic)
        .then(($element) => {
            carInfo.seat = $element.text().trim()
        })
    cy.get(trimSelectors.carCharacteristics)
        .contains(/Engine|Motor/i)
        .then(($element) => {
            carInfo.engine = $element.text().trim()
        })
    return cy.wrap(carInfo)
})