const {executeSpecificCommand} = require('../app');

describe('executeSpecificCommand test', () => {
  it('should call the filter method', async() => {
    const cmd = ['filter', 'ry']
    const result = executeSpecificCommand(cmd);
    const expectedResult = [{"name":"Uzuzozne","people":[{"name":"Lillie Abbott","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi","people":[{"name":"Anthony Bruno","animals":[{"name":"Oryx"}]}]}]
    expect(result).toEqual(JSON.stringify(expectedResult, null, 2));
  });

  it('should return "Wrong arguments"', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const cmd = ['test']
    executeSpecificCommand(cmd);
    expect(logSpy).toHaveBeenCalledWith('Wrong arguments');
    logSpy.mockRestore();

  });

  it('should return "No arguments"', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const cmd = []
    executeSpecificCommand(cmd);
    expect(logSpy).toHaveBeenCalledWith('No arguments');
    logSpy.mockRestore();
  });

});
