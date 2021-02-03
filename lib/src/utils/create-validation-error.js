"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = void 0;
const admin_bro_1 = require("admin-bro");
exports.createValidationError = (originalError) => {
    let errors;
    if (originalError.errors) {
        errors = Object.keys(originalError.errors).reduce((memo, key) => {
            const { message, kind, name } = originalError.errors[key];
            return {
                ...memo,
                [key]: {
                    message,
                    type: kind || name,
                },
            };
        }, {});
    }
    if (originalError.name && originalError.name === 'ValidationError') {
        errors = Object.keys(originalError.data).reduce((memo, key) => ({
            ...memo,
            [key]: {
                message: originalError.data[key],
                type: originalError.name,
            },
        }), {});
    }
    return new admin_bro_1.ValidationError(errors);
};
//# sourceMappingURL=create-validation-error.js.map