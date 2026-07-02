package utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import play.Play;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET = Play.application().configuration().getString("jwt.secret");

    private static final long EXPIRATION_TIME =   5 * 1000;

    public static String generateAccessToken(Long userId) {

        Date now = new Date();

        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return JWT.create().withClaim("userId", userId).withIssuedAt(now).withExpiresAt(expiryDate).sign(Algorithm.HMAC256(SECRET));
    }


    public static Long verifyToken(String token) {

        DecodedJWT jwt = JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token);

        return jwt.getClaim("userId").asLong();
    }
}