package ru.atconsulting.db.dao;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public List<User> getAllUsers() {
        String sql = "select * from User";
        List <User> allUsers = jdbcTemplateObject.query(sql,
                new UserMapper());
        return  allUsers;
    }

    @Override
    public void addUser(String login, String password) {
        String SQL = "insert into User (ID, NAME, PASSWORD) values (?, ?, ?)";
        jdbcTemplateObject.update( SQL, 12, login, password);
    }

}