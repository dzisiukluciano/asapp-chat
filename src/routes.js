const Router = require('express').Router();

Router.get('/health', (req, res) => res.send());

module.exports = Router;
