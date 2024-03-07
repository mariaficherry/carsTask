class comparePageSelectors {
    static comparePageTitle = '.spark-heading-2.sds-page-section__title'
    static addCar1MakeMenu = '.sds-text-field[data-qa="make-selector-vehicle_1"]'
    static addCar1ModelMenu = '.sds-text-field[data-qa="model-selector-vehicle_1"]'
    static addCar1YearMenu = '.sds-text-field[data-qa="year-selector-vehicle_1"]'
    static addCar2MakeMenu = '.sds-text-field[data-qa="make-selector-vehicle_2"]'
    static addCar2ModelMenu = '.sds-text-field[data-qa="model-selector-vehicle_2"]'
    static addCar2YearMenu = '.sds-text-field[data-qa="year-selector-vehicle_2"]'
    static comparisonButton = 'button:contains("comparison")'
    static compareCarCharacteristics = '.data-point'
    static carComparisonPage = '.vehicle-cards [data-slugs]'
}
export default comparePageSelectors;