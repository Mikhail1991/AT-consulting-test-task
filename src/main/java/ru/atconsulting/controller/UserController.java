package ru.atconsulting.controller;



import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import ru.atconsulting.db.dao.impl.UserJdbcTemplate;
import ru.atconsulting.db.model.User;

import java.util.ArrayList;
import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserJdbcTemplate userDao;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<JSONObject>> loadUsers() {
        List<JSONObject> entities = new ArrayList<JSONObject>();
        List<User> users = userDao.getAllUsers();

        for (User u : users) {
            JSONObject entity = new JSONObject();
            entity.put("id",u.getId());
            entity.put("name", u.getName());
            entities.add(entity);
        }

        return new ResponseEntity<List<JSONObject>>(entities, HttpStatus.OK);
    }


    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public  ResponseEntity addUser(@RequestParam(value = "login") String login,
                                   @RequestParam(value = "password") String password){
        try{
            if (!(userDao.getUserByLogin(login) == null)){
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            userDao.addUser(login,password);
        }catch(Exception ex){

        }
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public ResponseEntity deleteUser(@RequestParam(value = "id") String id){
        userDao.deleteUser(Integer.parseInt(id));
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value = "/changeUser", method = RequestMethod.POST)
    public ResponseEntity changeUserData(@RequestParam(value = "password") String password,
                                         @RequestParam(value = "login") String login){
        userDao.changeUserData(login, password);
        return new ResponseEntity(HttpStatus.OK);
    }
}
