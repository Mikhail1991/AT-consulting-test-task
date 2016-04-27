package ru.atconsulting.db.dao;

import ru.atconsulting.db.model.User;

import javax.sql.DataSource;
import java.util.List;

/**
 * Created by Mike on 27.04.2016.
 */
public interface UserDao {
    public void setDataSource(DataSource ds);

    public User getUserById(Integer id);

    public List<User> getAllUsers();

    public void addUser(String login, String password);
}
