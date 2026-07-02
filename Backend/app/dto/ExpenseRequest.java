package dto;

import java.math.BigDecimal;
import java.util.List;

public class ExpenseRequest {

    public BigDecimal amount;

    public String category;

    public String description;

    public List<ExpenseItemRequest> items;

    public void validate() {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException("Amount must be positive");
        }

        if (category == null || category.trim().isEmpty()) {

            throw new RuntimeException("Category required");
        }
        if (description != null && description.length() > 255) {

            throw new RuntimeException("Description too long");
        }
    }
}