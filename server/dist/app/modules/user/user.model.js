"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^([\w.-]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please fill a valid email address',
        ],
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false,
    },
    accountType: {
        type: String,
        required: true,
        enum: user_constant_1.AC_TYPE
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [
            /^(\+88)?(01[3-9]{1}\d{8})$/,
            'Please fill a valid phone number',
        ],
        unique: true,
    },
    nid: {
        type: String,
        required: true,
        match: [
            /^([0-9]{10,13})$/,
            'Please fill a valid NID number',
        ],
        unique: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: user_constant_1.USER_ROLE,
        default: 'user',
    },
    profileImg: {
        type: String,
    },
    status: {
        type: String,
        enum: user_constant_1.USER_STATUS,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.virtual('fullName').get(function () {
    var _a, _b;
    return (((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) +
        '' +
        ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.lastName));
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this; // doc
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select('+password');
    });
};
userSchema.statics.isUserExistsByPhoneNumber = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ phoneNumber }).select('+password');
    });
};
userSchema.statics.isUserExistsByNid = function (nid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ nid }).select('+password');
    });
};
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
