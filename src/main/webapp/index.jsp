<%--
  Created by IntelliJ IDEA.
  User: Mike
  Date: 28.04.2016
  Time: 22:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <script type="text/javascript" src="js/lib/jquery-1.12.3.min.js"></script>
  <script type="text/javascript" src="js/lib/jquery.idTabs.min.js"></script>
  <script type="text/javascript" src="js/bookService.js"></script>
  <script type="text/javascript" src="js/userService.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
  <script type="text/javascript" src="js/modal.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/main.css">

  <title>Библиотека</title>
</head>

<body>
<h3>Библиотека</h3>



<ul class="idTabs">
  <li><a href="#books" onclick="loadBooks()">Книги</a></li>
  <li><a href="#users" onclick="loadUsers()">Пользователи</a></li>
</ul>

<div id="books">
  <p>Подгружаем таблицу раз (книги)</p>
  <button><a href="#dialogBook" name="modal">Добавить книгу</a></button>
  <div id="booksTable">

  </div>
  <button onclick="getNextPage()">Показать ещё</button>
</div>
<div id="users">
  <p>Подгружаем таблицу два (пользователи)</p>
  <button><a href="#dialogUser" name="modal">Добавить пользователя</a></button>
  <div id="usersTable">

  </div>
  <button>Показать ещё</button>
</div>

<div id="boxes">
  <div id="dialogUser" class="window">
    Добавление пользователя
    <a href="#"class="close"/>Закрыть</a>

    <div>
      <p>Введите имя</p>
      <input id="login" type="text" size="50">
      <br>
      <p>Введите пароль</p>
      <input id="password" type="text" size="50">
    </div>
    <br>
    <button onclick="confirmAddUser()">Подтвердить</button>
  </div>

  <div id="dialogBook" class="window">
    Добавление книги
    <a href="#"class="close"/>Закрыть</a>

    <div>
      <p>Введите ISN</p>
      <input id="isn" type="text" size="50">
      <br>
      <p>Введите автора</p>
      <input id="author" type="text" size="50">
      <br>
      <p>Введите название</p>
      <input id="title" type="text" size="50">
      <br>
    </div>
    <br>
    <button onclick="confirmBook()">Подтвердить</button>
  </div>

  <div id="mask"></div>
</div>

</body>
</html>
