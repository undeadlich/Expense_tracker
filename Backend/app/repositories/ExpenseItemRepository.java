package repositories;

import java.util.List;
import javax.inject.Singleton;

import models.ExpenseItem;

@Singleton
public class ExpenseItemRepository {

    public void save(ExpenseItem item) {

        item.save();

    }

    public List<ExpenseItem> findByExpenseId(Long expenseId) {

        return ExpenseItem.find.query().where().eq("expense.id", expenseId).findList();
    }

    public void deleteByExpenseId(Long expenseId) {

        List<ExpenseItem> items = findByExpenseId(expenseId);

        items.forEach(ExpenseItem::delete);
    }
}