/* Magic Mirror
 * Node Helper: MMM-Notion-Calendar
 *
 * By Jordan Welch
 * MIT Licensed.
 */

// const Log = require('logger');
const NodeHelper = require('node_helper');
const { Client } = require('@notionhq/client');

module.exports = NodeHelper.create({
  start () {
    this.expressApp.get(
      '/MMM-Notion-Calendar.ics',
      this.handleRequest.bind(this),
    );
  },

  async handleRequest (req, res) {
    const { token, dataSourceId } = req.query;

    const notion = new Client({
      auth: token,
    });

    notion.dataSources.query({
      data_source_id: dataSourceId,
    });
  },
});
