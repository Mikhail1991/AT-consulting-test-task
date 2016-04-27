package ru.atconsulting.db.dao;



import ru.atconsulting.db.model.Book;

import javax.sql.DataSource;
import java.util.List;


public interface BookDao {
    public void setDataSource(DataSource ds);
    public void deleteBook(Integer id);
    public void addBook(String isn, String author, String title);
    public List<Book> getAllBooks(String sortParam, String pageParam);
}