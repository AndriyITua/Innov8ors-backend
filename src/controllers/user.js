import createHttpError from 'http-errors';
import { getUserById, patchUser } from '../services/user.js';

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
  const { id } = req.params;
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
