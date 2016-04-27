package ru.atconsulting.db.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.atconsulting.db.model.User;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class UserJdbcTemplate implements UserDao {

    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplateObject = new JdbcTemplate(dataSource);
    }

    @Override
    public User getUserById(Integer id) {
        String SQL = "select * from USER where id = ?";
        User user = jdbcTemplateObject.queryForObject(SQL,
                new Object[]{id}, new UserMapper());
        return user;
    }

    public User getUserByLogin(String login){
        User user;
        try{
            String SQL = "select * from USER where NAME = ?";
            user = jdbcTemplateObject.queryForObject(SQL,
                    new Object[]{login}, new UserMapper());
        }catch(EmptyResultDataAccessException ex){
            return null;
        }


        return user;
    }


    @Override
    public List<User> getAllUsers() {
        String sql = "select * from User ORDER BY NAME";
        List <User> allUsers = jdbcTemplateObject.query(sql,
                new UserMapper());
        return  allUsers;
    }

    @Override
    public void addUser(String login, String password) {
        String SQL = "insert into User (NAME, PASSWORD) values (?, ?)";
        jdbcTemplateObject.update( SQL, login, password);
    }

    public void deleteUser(Integer id){
        String SQL = "delete from User where id = ?";
        jdbcTemplateObject.update(SQL, id);
    }
}