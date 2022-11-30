'use strict';

/**
 * galaxy router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::galaxy.galaxy');
