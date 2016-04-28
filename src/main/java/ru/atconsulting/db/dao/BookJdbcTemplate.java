package ru.atconsulting.db.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.atconsulting.db.model.Book;

import javax.sql.DataSource;
import java.util.List;


@Repository
public class BookJdbcTemplate implements BookDao{

    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;

    @Override
    @Autowired
    public void setDataSource(DataSource ds) {
        this.dataSource = ds;
        this.jdbcTemplateObject = new JdbcTemplate(dataSource);
    }

    @Override
    public void deleteBook(Integer id) {
        String SQL = "delete from Book where id = ?";
        jdbcTemplateObject.update(SQL, id);
    }

    @Override
    public void addBook(String isn, String author, String title){
        String SQL = "insert into Book (ISN, AUTHOR, TITLE) values (?, ?, ?)";
        jdbcTemplateObject.update( SQL, isn, author, title);
    }

    @Override
    public Book getBookByIsn(String isn){
        Book book;
        try{
            String SQL = "select * from BOOK where ISN = ?";
            book = jdbcTemplateObject.queryForObject(SQL,
                    new Object[]{isn}, new BookMapper());
        }catch(EmptyResultDataAccessException ex){
            return null;
        }
        return book;
    }

    @Override
    public void getBook(Integer id, String user) {
        String SQL = "update BOOK set OWNER = ? where id = ?";
        jdbcTemplateObject.update(SQL, user, id);
    }

    @Override
    public void returnBook(Integer id){
        String SQL = "update BOOK set OWNER = null where id = ?";
        jdbcTemplateObject.update(SQL, id);
    }

    @Override
    public List<Book> getAllBooks(String sortParam, String pageParam){

        String sql = "select * from BOOK ORDER BY  " + sortParam + " LIMIT " + pageParam;
        List<Book> allBooks= jdbcTemplateObject.query(sql,
                new BookMapper());
        return  allBooks;
    }
}
