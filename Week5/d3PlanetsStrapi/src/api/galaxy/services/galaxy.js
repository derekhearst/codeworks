'use strict';

/**
 * galaxy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::galaxy.galaxy');
