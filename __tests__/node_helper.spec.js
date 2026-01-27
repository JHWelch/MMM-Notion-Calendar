const { Client } = require('@notionhq/client');
const { getMockReq, getMockRes } = require('@jest-mock/express');

let helper;
let query;

const { res, mockClear } = getMockRes();

beforeEach(() => {
  helper = require('../node_helper.js');
  helper.setName('MMM-Notion-Calendar');
});

afterEach(() => {
  mockClear();
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

describe('handleRequest', () => {
  beforeEach(() => {
    query = jest.fn();
    Client.mockImplementation(() => ({
      dataSources: { query },
    }));
  });

  it('calls notion with passed credentials', () => {
    const req = getMockReq({
      query: {
        token: 'test-notion-token',
        dataSourceId: 'test-datasource-id',
      },
    });

    helper.handleRequest(req, res);

    expect(Client).toHaveBeenCalledWith({
      auth: 'test-notion-token',
    });
    expect(query).toHaveBeenCalledWith({
      data_source_id: 'test-datasource-id',
    });
  });
});
