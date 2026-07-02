import api from "./api";

export const getExpenses = (params = {}) => {
    return api.get("/getExpenses", {
        params,
    });
};
export const getExpenseDetails = (id) => {
    return api.get(`/expense/${id}`);
};

export const createExpense = (expenseData) => {
    return api.post("/createExpense", expenseData);
};

export const editExpense = (id, expenseData) => {
    return api.put(`/editExpense/${id}`, expenseData);
};

export const deleteExpense = (id) => {
    return api.delete(`/deleteExpense/${id}`);
};
