package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.util.Date;
import java.math.BigDecimal;

import com.avaje.ebean.annotation.WhenCreated;

@Entity
public class Expense extends Model {

    @Id
    public Long id;

    @Column(nullable = false, precision = 19, scale = 2)
    public BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public ExpenseCategory category;

    public String description;

    @WhenCreated
    public Date expenseDate;

    @ManyToOne
    public User user;

    public static Finder<Long, Expense> find = new Finder<Long, Expense>(Expense.class);

    public enum ExpenseCategory {
        FOOD, TRANSPORT, SHOPPING, ENTERTAINMENT, HEALTH, EDUCATION, BILLS, TRAVEL, OTHER
    }
}