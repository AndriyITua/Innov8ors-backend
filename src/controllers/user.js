import createHttpError from 'http-errors';
import { getUserById, patchUser } from '../services/user.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import bcrypt from 'bcrypt';

const enableClaudinary = env('ENABLE_CLOUDINARY');

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getUserById(id);

  if (!data) {
    throw createHttpError(404, `User with ID ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found user by id ${id}!`,
    data,
  });
};

export const patchUserController = async (req, res) => {
  let userphoto;

  if (req.file) {
    if (enableClaudinary === 'true') {
      userphoto = await saveFileToCloudinary(req.file, 'photos');
    } else {
      userphoto = await saveFileToUploadDir(req.file);
    }
    req.body.userphoto = userphoto;
  }

  const { id } = req.params;
  console.log(
    `Patch user request for ID: ${id} with body: ${JSON.stringify(req.body)}`,
  );

  const result = await patchUser({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `User with ID ${id} not found`);
  }

  res.json({
    status: 200,
    message: `User by id ${id} patched successfully!`,
    data: result.data,
  });
};

export const changePasswordController = async (req, res) => {
  const { password, newPassword, repeatNewPassword } = req.body;
  const userId = req.params.id;

  const user = await getUserById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(400, 'Incorrect current password');
  }

  if (newPassword !== repeatNewPassword) {
    throw createHttpError(400, 'New passwords do not match');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await patchUser(
    { _id: userId },
    { password: hashedNewPassword },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found after update');
  }

  res.json({
    status: 200,
    message: 'Password updated successfully',
  });
};
