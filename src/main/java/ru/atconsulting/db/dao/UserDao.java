package ru.atconsulting.db.dao;

import ru.atconsulting.db.model.User;

import javax.sql.DataSource;
import java.util.List;

public interface UserDao {
    public void setDataSource(DataSource ds);

    public User getUserById(Integer id);

    public List<User> getAllUsers();

    public void addUser(String login, String password);

    public void deleteUser(Integer id);

    public void changeUserData(String login, String Password);

    public User getUserByLogin(String login);
}
