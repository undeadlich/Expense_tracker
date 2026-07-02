package dto;

import java.math.BigDecimal;
import java.util.List;

public class ExpenseResponse {

    public List<ExpenseDto> expenses;

    public List<ExpenseSummaryDto> categoryTotals;

    public BigDecimal totalExpense;

    public Integer page;

    public Integer size;

    public Long totalRecords;

    public Integer totalPages;
}