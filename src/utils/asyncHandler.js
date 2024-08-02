const asyncHandler = (fn = async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    console.log(`ERROR IN ASYNC HANDLER ===>>> ${e}`);
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

export { asyncHandler };
