package services;

import dto.ExpenseFilterRequest;
import models.Expense;
import models.User;
import models.Expense.ExpenseCategory;
import models.ExpenseItem;
import repositories.ExpenseRepository;
import repositories.UserRepository;
import repositories.ExpenseItemRepository;
import dto.ExpenseFilterRequest;
import dto.ExpenseSummaryDto;
import dto.ExpenseItemDto;
import dto.ExpenseItemRequest;
import dto.ExpenseDetailsDto;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.math.BigDecimal;
import java.util.List;

import dto.ExpenseDto;
import dto.ExpenseRequest;
import dto.ExpenseResponse;

import java.util.Map;
import java.util.stream.Collectors;

@Singleton
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseItemRepository expenseItemRepository;

    @Inject
    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository, ExpenseItemRepository expenseItemRepository) {

        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.expenseItemRepository = expenseItemRepository;
    }

    private ExpenseDto toDto(Expense expense) {

        ExpenseDto dto = new ExpenseDto();

        dto.id = expense.id;

        dto.amount = expense.amount;

        dto.category = expense.category.toString();

        dto.description = expense.description;

        dto.expenseDate = expense.expenseDate.toString();

        return dto;
    }

    private ExpenseItemDto toExpenseItemDto(ExpenseItem item) {

        ExpenseItemDto dto = new ExpenseItemDto();

        dto.id = item.id;

        dto.itemName = item.itemName;

        dto.quantity = item.quantity;

        dto.unitPrice = item.unitPrice;

        return dto;
    }

    public void createExpense(Long userId, ExpenseRequest request) {

        User user = userRepository.findById(userId);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Expense expense = new Expense();

        expense.amount = request.amount;

        expense.description = request.description;

        try {

            expense.category = ExpenseCategory.valueOf(request.category.toUpperCase());

        } catch (IllegalArgumentException e) {

            throw new RuntimeException("Invalid category");
        }

        expense.user = user;

        expenseRepository.save(expense);

        if (request.items != null && !request.items.isEmpty()) {

            for (ExpenseItemRequest itemRequest : request.items) {

                ExpenseItem item = new ExpenseItem();

                item.expense = expense;

                item.itemName = itemRequest.itemName;

                item.quantity = itemRequest.quantity;

                item.unitPrice = itemRequest.unitPrice;

                expenseItemRepository.save(item);
            }
        }

    }

    public void editExpense(Long userId, Long expenseId, ExpenseRequest request) {

        Expense expense = expenseRepository.findById(expenseId);

        if (expense == null) {

            throw new RuntimeException("Expense not found");
        }

        if (!expense.user.id.equals(userId)) {

            throw new RuntimeException("Not your expense");
        }

        expense.amount = request.amount;

        expense.description = request.description;

        try {

            expense.category = ExpenseCategory.valueOf(request.category.toUpperCase());

        } catch (IllegalArgumentException e) {

            throw new RuntimeException("Invalid category");
        }

        expenseRepository.update(expense);

        expenseItemRepository.deleteByExpenseId(expense.id);

        if (request.items != null && !request.items.isEmpty()) {

            for (ExpenseItemRequest itemRequest : request.items) {

                ExpenseItem item = new ExpenseItem();

                item.expense = expense;

                item.itemName = itemRequest.itemName;

                item.quantity = itemRequest.quantity;

                item.unitPrice = itemRequest.unitPrice;

                expenseItemRepository.save(item);
            }
        }
    }

    public void deleteExpense(Long userId, Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId);

        if (expense == null) {

            throw new RuntimeException("Expense not found");
        }

        if (!expense.user.id.equals(userId)) {

            throw new RuntimeException("Not your expense");
        }

        expenseItemRepository.deleteByExpenseId(expense.id);

        expenseRepository.delete(expense);
    }

    public ExpenseResponse getExpenses(Long userId, ExpenseFilterRequest filter) {

        List<Expense> expenses = expenseRepository.findExpenses(userId, filter);

        List<ExpenseDto> expenseDtos = expenses.stream().map(this::toDto).collect(Collectors.toList());

        BigDecimal totalExpense = expenses.stream().map(expense -> expense.amount).reduce(BigDecimal.ZERO, BigDecimal::add);

        List<ExpenseSummaryDto> categoryTotals =

                expenses.stream().collect(Collectors.groupingBy(expense -> expense.category.toString(),

                        Collectors.reducing(BigDecimal.ZERO, expense -> expense.amount, BigDecimal::add))).entrySet().stream().map(entry -> {

                    ExpenseSummaryDto dto = new ExpenseSummaryDto();

                    dto.category = entry.getKey();

                    dto.total = entry.getValue();

                    return dto;
                }).collect(Collectors.toList());
        long totalRecords = expenseRepository.countExpenses(userId, filter);
        int totalPages = (int) Math.ceil((double) totalRecords / filter.size);
        ExpenseResponse response = new ExpenseResponse();

        response.expenses = expenseDtos;

        response.categoryTotals = categoryTotals;

        response.totalExpense = totalExpense;
        response.page = filter.page;

        response.size = filter.size;

        response.totalRecords = totalRecords;
        response.totalPages = totalPages;

        return response;
    }

    public ExpenseDetailsDto getExpenseDetails(Long userId, Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId);

        if (expense == null) {

            throw new RuntimeException("Expense not found");
        }

        if (!expense.user.id.equals(userId)) {

            throw new RuntimeException("Not your expense");
        }

        List<ExpenseItem> items = expenseItemRepository.findByExpenseId(expense.id);

        ExpenseDetailsDto dto = new ExpenseDetailsDto();

        dto.id = expense.id;

        dto.amount = expense.amount;

        dto.category = expense.category.toString();

        dto.description = expense.description;

        dto.expenseDate = expense.expenseDate;

        dto.items = items.stream()

                .map(this::toExpenseItemDto)

                .collect(Collectors.toList());

        dto.itemsTotal = items.stream()

                .map(item -> item.unitPrice.multiply(BigDecimal.valueOf(item.quantity)))

                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return dto;
    }
}