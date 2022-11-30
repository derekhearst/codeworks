'use strict';

/**
 * moon controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::moon.moon');
