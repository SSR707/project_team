import jwt from "jsonwebtoken"
import { config } from "../../config/index.js"

export const refreshTokenVerify = async (token) => {
    return jwt.verify(token, config.jwt.refresh.secret, (error, decode) => {
        if (error) throw new Error(error);

        const accessToken = jwt.sign(
          {
            sub: decode.sub,
            role: decode.role,
          },
          config.jwt.access.secret,
          {
            expiresIn: config.jwt.access.expiresIn,
          }
        );
  
        return { accessToken, refreshToken: token };
      });
}
