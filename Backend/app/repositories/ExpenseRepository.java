package repositories;

import models.Expense;

import javax.inject.Singleton;
import java.util.List;

import dto.ExpenseFilterRequest;
import com.avaje.ebean.ExpressionList;


@Singleton
public class ExpenseRepository {

    public void save(Expense expense) {
        expense.save();
    }

    public Expense findById(Long id) {

        return Expense.find.where().eq("id", id).findUnique();
    }

    public List<Expense> findByUserId(Long userId) {

        return Expense.find.where().eq("user.id", userId).orderBy("expenseDate desc").findList();
    }

    public void update(Expense expense) {
        expense.update();
    }

    public void delete(Expense expense) {
        expense.delete();
    }

    public List<Expense> findExpenses(Long userId, ExpenseFilterRequest filter) {

        ExpressionList<Expense> query = Expense.find.where().eq("user.id", userId);
        if (filter.category != null && !filter.category.trim().isEmpty()) {

            query.eq("category", filter.category.toUpperCase());
        }
        if (filter.fromDate != null) {

            query.ge("expenseDate", filter.fromDate);
        }

        if (filter.toDate != null) {

            query.lt("expenseDate", filter.toDate.plusDays(1));
        }
        if ("amount_asc".equals(filter.sort)) {

            query.orderBy("amount asc");

        } else if ("amount_desc".equals(filter.sort)) {

            query.orderBy("amount desc");

        } else if ("date_asc".equals(filter.sort)) {

            query.orderBy("expenseDate asc");

        } else if ("date_desc".equals(filter.sort)) {

            query.orderBy("expenseDate desc");

        } else {

            query.orderBy("expenseDate desc");
        }
        query.setFirstRow((filter.page - 1) * filter.size).setMaxRows(filter.size);
        if (filter.search != null && !filter.search.trim().isEmpty()) {

            query.ilike("description", "%" + filter.search + "%");
        }

        return query.findList();
    }

    public long countExpenses(Long userId, ExpenseFilterRequest filter) {

        ExpressionList<Expense> query = Expense.find.where().eq("user.id", userId);

        if (filter.category != null && !filter.category.trim().isEmpty()) {

            query.eq("category", filter.category.toUpperCase());
        }
        if (filter.fromDate != null) {

            query.ge("expenseDate", filter.fromDate);
        }

        if (filter.toDate != null) {

            query.lt("expenseDate", filter.toDate.plusDays(1));
        }
        if (filter.search != null && !filter.search.trim().isEmpty()) {

            query.ilike("description", "%" + filter.search + "%");
        }


        return query.findRowCount();
    }

}