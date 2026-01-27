let helper;

beforeEach(() => {
  helper = require('../node_helper.js');
  helper.setName('MMM-Notion-Calendar');
});

describe('start', () => {
  it('registers an ics endpoint', () => {
    helper.start();

    expect(helper.expressApp.get).toHaveBeenCalledWith(
      '/MMM-Notion-Calendar.ics',
      expect.any(Function),
    );
  });
});
