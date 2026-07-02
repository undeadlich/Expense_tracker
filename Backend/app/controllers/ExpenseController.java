package controllers;

import auth.Authenticated;
import com.fasterxml.jackson.databind.JsonNode;

import models.Expense;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import services.ExpenseService;
import dto.ExpenseRequest;
import dto.ExpenseResponse;
import dto.ExpenseDetailsDto;

import javax.inject.Inject;
import java.util.List;

import dto.ExpenseFilterRequest;

import java.time.LocalDate;

public class ExpenseController extends Controller {

    private final ExpenseService expenseService;

    @Inject
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @Authenticated
    public Result create() {

        Long userId = (Long) Http.Context.current().args.get("userId");

        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest("Invalid JSON");
        }
        ExpenseRequest request = Json.fromJson(json, ExpenseRequest.class);

        try {
            request.validate();
            expenseService.createExpense(userId, request);

            return ok("Expense created");

        } catch (RuntimeException e) {

            return badRequest(e.getMessage());
        }
    }

    @Authenticated
    public Result edit(Long id) {

        Long userId = (Long) Http.Context.current().args.get("userId");

        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest("Invalid JSON");
        }
        ExpenseRequest request = Json.fromJson(json, ExpenseRequest.class);

        try {
            request.validate();
            expenseService.editExpense(userId, id, request);

            return ok("Expense edited");

        } catch (RuntimeException e) {

            return badRequest(e.getMessage());
        }
    }

    @Authenticated
    public Result delete(Long id) {

        Long userId = (Long) Http.Context.current().args.get("userId");

        try {

            expenseService.deleteExpense(userId, id);

            return ok("Expense deleted");

        } catch (RuntimeException e) {

            return badRequest(e.getMessage());
        }
    }

    @Authenticated
    public Result getExpenses() {

        Long userId = (Long) Http.Context.current().args.get("userId");

        ExpenseFilterRequest filter = new ExpenseFilterRequest();


        String fromDate = request().getQueryString("fromDate");
        String toDate = request().getQueryString("toDate");
        filter.fromDate = (fromDate == null || fromDate.trim().isEmpty()) ? null : LocalDate.parse(fromDate);

        filter.toDate = (toDate == null || toDate.trim().isEmpty()) ? null : LocalDate.parse(toDate);


        filter.category = request().getQueryString("category");

        filter.sort = request().getQueryString("sort");
        filter.page = request().getQueryString("page") == null ? 1 : Integer.parseInt(request().getQueryString("page"));

        filter.size = request().getQueryString("size") == null ? 20 : Integer.parseInt(request().getQueryString("size"));
        filter.search = request().getQueryString("search");
        ExpenseResponse response = expenseService.getExpenses(userId, filter);


        return ok(Json.toJson(response));
    }

    @Authenticated
    public Result getExpenseDetails(Long id) {

        Long userId = (Long) Http.Context.current().args.get("userId");

        ExpenseDetailsDto response = expenseService.getExpenseDetails(userId, id);

        return ok(Json.toJson(response));
    }
}