'use strict';

/**
 * galaxy controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::galaxy.galaxy');
