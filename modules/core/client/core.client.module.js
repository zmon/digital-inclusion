'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('digitalInclusion.core');
ApplicationConfiguration.registerModule('digitalInclusion.core.map', ['ui.map']);
ApplicationConfiguration.registerModule('digitalInclusion.core.admin', ['digitalInclusion.core']);
ApplicationConfiguration.registerModule('digitalInclusion.core.admin.routes', ['ui.router']);
