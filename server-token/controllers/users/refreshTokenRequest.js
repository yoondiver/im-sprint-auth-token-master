const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.

  const isRefreshToken = req.cookies.refreshToken;

  if (!isRefreshToken) {
    res.status(400).send({ data: null, message: "refresh token not provided" });
  } else if (isRefreshToken === "invalidtoken") {
    res
      .status(400)
      .send({
        data: null,
        message: "invalid refresh token, please log in again",
      });
  } else {
    const data = jwt.verify(isRefreshToken, process.env.REFRESH_SECRET);
    if (!data) {
      res
        .status(400)
        .send({ data: null, message: "refresh token has been tempered" });
    } else {
      const payload = {
        id: data.id,
        userId: data.userId,
        email: data.email,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).send({
        data: {
          accessToken: accessToken,
          userInfo: payload,
        },
        message: "ok",
      });
    }
  }
};
