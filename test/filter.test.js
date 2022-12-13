const {filter} = require('../app');

describe('filter test', () => {
    it('should show the animals matching with the ry string pattern and the count as number of people', () => {
        const result = filter('ry');
        const expectedResult = [{"name":"Uzuzozne","people":[{"name":"Lillie Abbott","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi","people":[{"name":"Anthony Bruno","animals":[{"name":"Oryx"}]}]}]
        expect(result).toEqual(JSON.stringify(expectedResult, null, 2));
    });
});
