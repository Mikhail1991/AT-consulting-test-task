package ru.atconsulting.db.model;

/**
 * Created by Mike on 27.04.2016.
 */
public class Book {
    private Integer id;
    private String isn;
    private String author;
    private String title;
    private String owner;

    public Book() {
    }

    public Book(Integer id, String isn, String author, String title, String owner) {
        this.id = id;
        this.isn = isn;
        this.author = author;
        this.title = title;
        this.owner = owner;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIsn() {
        return isn;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getOwner() {
        return owner;
    }

    public void setIsn(String isn) {
        this.isn = isn;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}