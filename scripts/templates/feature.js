const featureConfigs = require("./base/configs");
const featureHooks = require("./base/hooks");
const featureIndex = require("./base/index");
const featurePage = require("./base/page");
const featureSections = require("./base/sections");
const featureLocales = require("./base/locales");
const featureLocalesEn = require("./base/localesEn");
const featureLocalesId = require("./base/localesId");
const featureStyles = require("./base/styles");
const featureTests = require("./base/test");
const featureTypes = require("./base/types");

module.exports = [
  featureConfigs,
  featureHooks,
  featureIndex,
  featurePage,
  featureSections,
  featureLocales,
  featureLocalesEn,
  featureLocalesId,
  featureStyles,
  featureTypes,
  featureTests,
];
