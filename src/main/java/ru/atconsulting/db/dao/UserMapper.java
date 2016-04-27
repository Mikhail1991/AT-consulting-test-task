package ru.atconsulting.db.dao;

import org.springframework.jdbc.core.RowMapper;
import ru.atconsulting.db.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User user = new User();
        user.setName(resultSet.getString("name"));
        user.setSurname(resultSet.getString("surname"));
        user.setPassword(resultSet.getString("password"));
        return user;
    }
}