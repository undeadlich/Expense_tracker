package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.AuthService;
import dto.LoginRequest;
import dto.SignupRequest;

import javax.inject.Inject;

import dto.LoginResponse;
import dto.RefreshTokenRequest;
import auth.Authenticated;
import play.mvc.Http;

public class AuthController extends Controller {

    private final AuthService authService;

    @Inject
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    private void setAccessCookie(String token) {

        response().setCookie("accessToken", token, 7 * 24 * 60 * 60, "/", null, false, // secure=true in production HTTPS
                true   // HttpOnly
        );
    }

    private void setRefreshCookie(String token) {

        response().setCookie("refreshToken", token, 7 * 24 * 60 * 60, "/", null, false, true);
    }

    public Result signup() {

        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest("Invalid JSON");
        }

        SignupRequest request = Json.fromJson(json, SignupRequest.class);


        try {
            request.validate();

            LoginResponse response = authService.signup(request);

            setAccessCookie(response.accessToken);

            setRefreshCookie(response.refreshToken);

            return ok("Signup successful");

        } catch (RuntimeException e) {

            return badRequest(e.getMessage());
        }
    }

    public Result login() {

        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest("Invalid JSON");
        }

        LoginRequest request = Json.fromJson(json, LoginRequest.class);
        try {

            LoginResponse response = authService.login(request);

            setAccessCookie(response.accessToken);

            setRefreshCookie(response.refreshToken);

            return ok("Login successful");
        } catch (RuntimeException e) {

            return unauthorized(e.getMessage());
        }
    }


    public Result refresh() {

        Http.Cookie cookie = request().cookie("refreshToken");

        if (cookie == null) {

            return unauthorized("Missing refresh token");
        }


        try {

            String token = authService.refresh(cookie.value());

            setAccessCookie(token);

            return ok("Token refreshed");


        } catch (RuntimeException e) {

            return unauthorized(e.getMessage());
        }
    }

    @Authenticated
    public Result logout() {

        Long userId = (Long) Http.Context.current().args.get("userId");
        try {
            authService.Logout(userId);
            response().discardCookie("accessToken");

            response().discardCookie("refreshToken");
            return ok("Logged out");

        } catch (RuntimeException e) {

            return unauthorized(e.getMessage());


        }
    }
}