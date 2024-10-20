import { UserCollection } from '../db/models/User.js';

export const getUserById = (id) => UserCollection.findById(id);

export const patchUser = async (filter, data, options = {}) => {
  const rawResult = await UserCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};
