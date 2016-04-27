package ru.atconsulting.controller;


import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.atconsulting.db.dao.BookJdbcTemplate;
import ru.atconsulting.db.model.Book;

import java.util.ArrayList;
import java.util.List;


@RestController
public class BookController {

    @Autowired
    private BookJdbcTemplate bookDao;

    @RequestMapping(value = "/deleteBook", method = RequestMethod.POST)
    public ResponseEntity deleteBook(@RequestParam(value = "id") String id){
        bookDao.deleteBook(Integer.valueOf(id));
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value = "/addBook", method = RequestMethod.POST)
    public ResponseEntity addBook(@RequestParam(value = "isn") String isn,
                                  @RequestParam(value = "author") String author,
                                  @RequestParam(value = "title") String title){
        bookDao.addBook(isn,author,title);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public ResponseEntity<List<JSONObject>> hello(@RequestParam(value = "sortParam") String sortParam,
                                                  @RequestParam(value = "pageParam") String pageParam) {

        List<JSONObject> entities = new ArrayList<JSONObject>();
        List<Book> books = new ArrayList<Book>();
        try{
            books = bookDao.getAllBooks(sortParam,pageParam);
        }catch(Exception ex){
            int t =9;
        }

        for (Book n : books) {
            JSONObject entity = new JSONObject();
            entity.put("id", n.getId());
            entity.put("isn", n.getIsn());
            entity.put("author", n.getAuthor());
            entity.put("title", n.getTitle());
            entity.put("owner", n.getOwner());
            entities.add(entity);
        }
        return new ResponseEntity<List<JSONObject>>(entities, HttpStatus.OK);
    }
}
