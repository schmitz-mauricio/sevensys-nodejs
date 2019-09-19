import * as graylog2 from "graylog2";
const config = require("../config/graylog");

/*
logger.log("TITLE", JSON.stringify(data));
*/

module.exports = new graylog2.graylog({
  prelog: config.graylog.prelog,
  servers: config.graylog.servers,
  facility: config.graylog.facility,
});
