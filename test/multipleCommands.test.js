const {executeMultipleCommands} = require('../app');
describe('executeMuntipleCommands test', () => {
  it('should show the animals matching with the ry string pattern', () => {
    const args = ['filter=ry','count']
    const result = executeMultipleCommands(args);
    const expectedResult = [{"name":"Uzuzozne [1]","people":[{"name":"Lillie Abbott [1]","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi [1]","people":[{"name":"Anthony Bruno [1]","animals":[{"name":"Oryx"}]}]}]
    expect(result).toEqual(JSON.stringify(expectedResult, null, 2));
  });

  it('should return "wrong argument" in case of passing a different arg from count and filter', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const args = ['test']
    executeMultipleCommands(args);
    expect(logSpy).toHaveBeenCalledWith('Wrong arguments');
    logSpy.mockRestore();

  });

});
