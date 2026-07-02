package dto;

import java.time.LocalDate;

public class ExpenseFilterRequest {

    public LocalDate fromDate;

    public LocalDate toDate;

    public String category;

    public String sort;

    public Integer page;

    public Integer size;

    public String search;

}