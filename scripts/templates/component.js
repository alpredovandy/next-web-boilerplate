const componentConfigs = require("./base/configs");
const componentHooks = require("./base/hooks");
const componentIndex = require("./base/component");
const componentStyles = require("./base/styles");
const componentTests = require("./base/componentTest");
const componentTypes = require("./base/types");

module.exports = [
  componentConfigs,
  componentHooks,
  componentIndex,
  componentStyles,
  componentTypes,
  componentTests,
];
