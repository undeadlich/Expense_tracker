package auth;

import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import utils.JwtUtil;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class AuthAction extends Action<Authenticated> {

    @Override
    public CompletionStage<Result> call(Http.Context ctx) {

        try {

            Http.Cookie cookie = ctx.request().cookie("accessToken");

            if (cookie == null) {
                return CompletableFuture.completedFuture(unauthorized("No token"));
            }


            String token = cookie.value();


            Long userId = JwtUtil.verifyToken(token);

            ctx.args.put("userId", userId);


            return delegate.call(ctx);


        } catch (Exception e) {

            return CompletableFuture.completedFuture(unauthorized("Invalid or expired token"));
        }
    }
}