package controllers;

import auth.Authenticated;
import repositories.UserRepository;
import models.Expense;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import dto.UserResponse;

import javax.inject.Inject;

import dto.HomeResponse;
import services.HomeService;

public class HomeController extends Controller {

    private final HomeService homeService;

    @Inject
    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @Authenticated
    public Result home() {

        Long userId = (Long) Http.Context.current().args.get("userId");

        try {

            HomeResponse response = homeService.getDashboard(userId);

            return ok(Json.toJson(response));

        } catch (RuntimeException e) {

            return badRequest(e.getMessage());
        }
    }
}
