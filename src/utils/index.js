module.exports = {
  updateValidator: (body, allowedUpdate) => {
    const updates = Object.keys(body);
    const isValidOperation = updates.every((update) =>
      allowedUpdate.includes(update)
    );

    return isValidOperation;
  },
};
