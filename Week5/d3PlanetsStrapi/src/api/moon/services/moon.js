'use strict';

/**
 * moon service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::moon.moon');
