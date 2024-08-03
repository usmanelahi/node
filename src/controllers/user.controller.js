import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  let coverImage;
  let coverImageLocalPath = "";
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req?.files?.avatar[0].path;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req?.files?.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  if (coverImageLocalPath) {
    coverImage = await uploadCloudinary(coverImageLocalPath);
  }

  console.log(`The avatar is ===>>> ${avatar}`);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    password,
  });

  const createdUser = await User.findById({ _id: user._id }).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered"));
});

export { registerUser };
