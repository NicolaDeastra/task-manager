module.exports = {
  updateValidator: (updates, allowedUpdate) => {
    const isValidOperation = updates.every((update) =>
      allowedUpdate.includes(update)
    );

    return isValidOperation;
  },
};
