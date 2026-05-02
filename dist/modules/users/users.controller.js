"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddress = exports.getProfile = void 0;
const users_service_1 = require("./users.service");
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await (0, users_service_1.getUserProfileService)(userId);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getProfile = getProfile;
const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;
        if (!address || address.trim() === '') {
            res.status(400).json({ message: 'La dirección no puede estar vacía' });
            return;
        }
        const user = await (0, users_service_1.updateAddressService)(userId, address);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateAddress = updateAddress;
