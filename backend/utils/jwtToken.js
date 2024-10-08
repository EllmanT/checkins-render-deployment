//creating the token and storing as cookies

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,

    user,
    token,
  });
};

module.exports = sendToken;
