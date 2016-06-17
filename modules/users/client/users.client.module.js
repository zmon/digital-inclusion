'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['digitalInclusion.core']);
ApplicationConfiguration.registerModule('users.admin', ['digitalInclusion.core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['digitalInclusion.core.admin.routes']);
