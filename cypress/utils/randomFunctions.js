import * as testData from '../fixtures/testData.json'

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + testData.maxIndex)) + min
}