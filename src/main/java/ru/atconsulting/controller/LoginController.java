package ru.atconsulting.controller;


import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @RequestMapping(value = "/getLogin", method = RequestMethod.POST)
    public ResponseEntity<JSONObject> getLogin(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        JSONObject entity = new JSONObject();
        entity.put("name",name);
        return new ResponseEntity<JSONObject>(entity,HttpStatus.OK);
    }
}
