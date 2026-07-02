package services;

import dto.HomeResponse;
import models.Expense;
import models.User;
import repositories.ExpenseRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.time.LocalDate;
import java.util.List;

import dto.HomeResponse;

import java.time.ZoneId;
import java.time.LocalDate;

@Singleton
public class HomeService {

    private final UserRepository userRepository;

    private final ExpenseRepository expenseRepository;

    @Inject
    public HomeService(UserRepository userRepository, ExpenseRepository expenseRepository) {
        this.userRepository = userRepository;

        this.expenseRepository = expenseRepository;
    }

    public HomeResponse getDashboard(Long userId) {

        User user = userRepository.findById(userId);

        if (user == null) {

            throw new RuntimeException("User not found");
        }

        List<Expense> expenses = expenseRepository.findByUserId(userId);

        HomeResponse response = new HomeResponse();

        response.name = user.name;

        response.totalExpenses = expenses.stream().mapToDouble(e -> e.amount.doubleValue()).sum();

        response.totalExpensesCount = (long) expenses.size();

        int currentMonth = LocalDate.now().getMonthValue();

        int currentYear = LocalDate.now().getYear();

        response.currentMonthExpenses = expenses.stream().filter(e -> {

            LocalDate date = e.expenseDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            return date.getMonthValue() == currentMonth && date.getYear() == currentYear;
        }).mapToDouble(e -> e.amount.doubleValue()).sum();

        return response;
    }
}