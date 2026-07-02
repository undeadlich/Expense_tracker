package dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class ExpenseDetailsDto {

    public Long id;

    public BigDecimal amount;

    public String category;

    public String description;

    public Date expenseDate;

    public BigDecimal itemsTotal;

    public List<ExpenseItemDto> items;


}