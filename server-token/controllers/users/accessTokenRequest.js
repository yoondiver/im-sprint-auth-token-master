const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.

  if (!req.headers.authorization) {
    res.status(404).send({ data: null, message: "invalid access token" });
  } else {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    if (!data) {
      res.status(400).send({ data: null, message: "invalid access token" });
    } else {
      res.status(200).send({
        data: {
          userInfo: {
            id: data.id,
            userId: data.userId,
            email: data.email,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        },
        message: "ok",
      });
    }
  }

  // console.log(req.headers);
};
