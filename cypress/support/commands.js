import * as testData from '../fixtures/testData.json'
import Selectors from "../support/selectors.js"

Cypress.Commands.add('checkMainPageIsOpen', () => {
    cy.url().should('eq', testData.carsMainPage)
    cy.get(Selectors.logo).should('be.visible')
})

Cypress.Commands.add('goToResearchReviewsPage', () => {
    cy.get(Selectors.pageMenuTitles).contains(testData.testResearchLinkTitle).click()
})

Cypress.Commands.add('checkResearchReviewsPageIsOpen', () => {
    cy.url().should('contain', testData.researchPage)
    cy.get(Selectors.researchHeading).contains(testData.testResearchLinkTitle)
})

Cypress.Commands.add('selectRandomOption', (optionSelector, menuSelector) => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    return cy.get(optionSelector).then(listing => {
        const randomNumber = getRandomInt(0, listing.length - 1)
        return cy.get(optionSelector).eq(randomNumber).invoke('text').then(text => {
            return cy.get(menuSelector).select(text).then(() => {
                return text
            })
        })
    })
})

Cypress.Commands.add('selectRandomCharacteristics', (fileName) => {
    const options = {}

    cy.selectRandomOption(Selectors.makeMenuOption, Selectors.makeMenu)
        .then(text => {
            options.make = text
            return text
        })
        .then(() => cy.selectRandomOption(Selectors.modelMenuOption, Selectors.modelMenu))
        .then(text => {
            options.model = text
            return text
        })
        .then(() => cy.selectRandomOption(Selectors.yearMenuOption, Selectors.yearMenu))
        .then(text => {
            options.year = text
            return text
        })
        .then(() => {
            const filePath = 'cypress/fixtures/' + fileName
            cy.writeFile(filePath, options)
        })
})

Cypress.Commands.add('checkOptionsAreSelected', () => {
    cy.get(Selectors.noOptionSelectedInMakeMenu).should('not.exist')
})

Cypress.Commands.add('clickResearchButton', () => {
    cy.get(Selectors.researchButton).click()
})

Cypress.Commands.add('checkPageWithCarDescriptionOpens', (filePath) => {
    cy.fixture(filePath).then(options => {
        const selector = `${Selectors.selectedOptionsTitle1}:contains(${options.make}), ${Selectors.selectedOptionsTitle2}:contains(${options.make})`
        cy.get(selector).should('exist').and('be.visible')
    })
})

Cypress.Commands.add('selectBasicTrim', () => {
    cy.get(Selectors.trimOptions).children().eq(0).find('a').click()
})

Cypress.Commands.add('storeCarCharacteristics', (fileName) => {
    const carInfo = {}
    cy.get(Selectors.carCharacteristics).contains(testData.doorCharacteristic).then(($element) => {
        carInfo.door = $element.text().trim()
    })
    cy.get(Selectors.carCharacteristics).contains(testData.seatCharacteristic).then(($element) => {
        carInfo.seat = $element.text().trim()
    })
    cy.get(Selectors.carCharacteristics).contains(/Engine|Motor/i).then(($element) => {
        carInfo.engine = $element.text().trim()
    }).then(() => {
        const filePath = testData.files + fileName
        cy.writeFile(filePath, carInfo)
    })
})

Cypress.Commands.add('goToMainPage', () => {
    cy.visit(testData.carsMainPage, { headers: { "Accept-Encoding": "gzip, deflate" } })
})

Cypress.Commands.add('goToCompareTwoCarsLink', () => {
    cy.get(Selectors.compareTwoCars).click()
})

Cypress.Commands.add('checkComparePageIsOpen', () => {
    cy.url().should('contain', testData.comparePage)
    cy.get(Selectors.comparePageTitle).should('be.visible')
})

Cypress.Commands.add('addCar1Characteristics', (fileName) => {
    cy.fixture(fileName).then((carInfo) => {
        const makeValue = carInfo.make
        const modelValue = carInfo.model
        const yearValue = carInfo.year
        cy.get(Selectors.addCar1MakeMenu).select(makeValue).then(() => {
            cy.request({
                method: 'GET',
                url: testData.makeMenuEnpoint,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
        cy.get(Selectors.addCar1MakeMenu)
            .should('have.value', makeValue.toLowerCase())
            .then(() => {
                cy.get(Selectors.addCar1ModelMenu).select(modelValue)
                cy.get(Selectors.addCar1YearMenu).select(yearValue)
            })
    })
})

Cypress.Commands.add('addCar2Characteristics', (fileName) => {
    cy.fixture(fileName).then((carInfo) => {
        const makeValue = carInfo.make
        const modelValue = carInfo.model
        const yearValue = carInfo.year
        cy.get(Selectors.addCar2MakeMenu).select(makeValue).then(() => {
            cy.get(Selectors.addCar2ModelMenu).select(modelValue)
            cy.get(Selectors.addCar2YearMenu).select(yearValue)
        })
    })
})

Cypress.Commands.add('clickComparisonButton', () => {
    cy.get(Selectors.comparisonButton).click()
})

Cypress.Commands.add('checkCharacteristicsOnComparePage', (fileName) => {
    cy.fixture(fileName).then((carInfo) => {
        cy.get(Selectors.carComparisonPage)
            .should('contain', carInfo.make)
            .should('contain', carInfo.model)
            .should('contain', carInfo.year)
    })
})