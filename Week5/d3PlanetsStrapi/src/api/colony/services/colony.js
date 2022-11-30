'use strict';

/**
 * colony service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::colony.colony');
