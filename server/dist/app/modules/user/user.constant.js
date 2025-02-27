"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchableFields = exports.USER_STATUS = exports.DEFAULT_PROFILE_URL = exports.AC_TYPE = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    user: 'user',
    agent: 'agent',
    admin: 'admin'
};
exports.AC_TYPE = {
    Agent: 'Agent',
    User: 'User',
};
exports.DEFAULT_PROFILE_URL = 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png';
exports.USER_STATUS = {
    inProgress: 'in-progress',
    blocked: 'blocked'
};
exports.UserSearchableFields = [
    'name',
    'email',
    'phone',
    'role',
    'status',
];
