package models;

import com.avaje.ebean.Model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "expense_items")
public class ExpenseItem extends Model {

    @Id
    public Long id;

    @ManyToOne
    public Expense expense;

    @Column(nullable = false)
    public String itemName;

    @Column(nullable = false)
    public Integer quantity;

    @Column(nullable = false)
    public BigDecimal unitPrice;

    public static Finder<Long, ExpenseItem> find = new Finder<>(ExpenseItem.class);
}