import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { NotFoundError } from '../errors/custom-api-error.js';
import { hideEmail } from '../utils/hide-details.js';

export const getUserDetails = async (req, res) => {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
        throw new NotFoundError('Thông tin tài khoản không tồn tại');
    }
    const hiddenEmail = hideEmail(user.email);
    res.status(StatusCodes.OK).json({
        userDetails: {
            email: hiddenEmail,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            role: user.role,
            image: user.image,
        },
    });
};
