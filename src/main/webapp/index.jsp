<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head lang="en">
    <meta charset="UTF-8">
    <script type="text/javascript" src="lib/jquery-1.12.3.min.js"></script>
    <script type="text/javascript" src="lib/jquery.idTabs.min.js"></script>
    <script type="text/javascript" src="js/bookService.js"></script>
    <script type="text/javascript" src="js/userService.js"></script>
    <script type="text/javascript" src="js/modal.js"></script>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css"
          href="lib/bootstrap-3.3.5-dist/bootstrap-3.3.5-dist/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css"
          href="lib/bootstrap-3.3.5-dist/bootstrap-3.3.5-dist/css/bootstrap.min.css">
    <script type="text/javascript" src="lib/bootstrap-3.3.5-dist/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <title>Библиотека</title>
</head>

<body>
<h3 class="modal-title">Библиотека</h3>

<ul class="idTabs" class="list-group">
    <li><a href="#books" onclick="loadBooks()">Книги</a></li>
    <li><a href="#users" onclick="loadUsers()">Пользователи</a></li>
</ul>

<div class="col-sm-4" id="books">
    <p class="panel-title">Книги</p>
    <button class="btn-default"><a href="#dialogBook" name="modal">Добавить книгу</a></button>
    <div class="tab-pane" id="booksTable">

    </div>
    <br>
    <button class="btn-default" onclick="getNextPage()">Показать ещё</button>
</div>

<div class="col-sm-4" id="users">
    <p class="panel-title">Пользователи</p>
    <button class="btn-default"><a href="#dialogUser" name="modal">Добавить пользователя</a></button>
    <div class="tab-pane" id="usersTable">

    </div>
</div>

<div id="boxes">
    <div id="dialogUser" class="window">
        Добавление пользователя
        <a href="#" class="close"/>Закрыть</a>

        <div class="input-group">
            <p class="label-info">Введите имя</p>
            <input class="input-sm" id="login" type="text" size="45">
            <br>

            <p class="label-info">Введите пароль</p>
            <input class="input-sm" id="password" type="text" size="45">
        </div>
        <br>
        <button class="btn-default" onclick="confirmAddUser()">Подтвердить</button>
    </div>

    <div id="dialogUserChange" class="window">
        Изменить данные пользователя
        <a href="#" class="close"/>Закрыть</a>

        <div class="input-group">
            <p class="label-info">Введите имя</p>
            <input class="input-sm" id="changeLogin" type="text" size="45">
            <br>

            <p class="label-info">Введите пароль</p>
            <input class="input-sm" id="changePassword" type="text" size="45">
        </div>
        <br>
        <button class="btn-default" onclick="confirmChangeUserData()">Подтвердить</button>
    </div>

    <div id="dialogBook" class="window">
        Добавление книги
        <a href="#" class="close">Закрыть</a>

        <div class="input-group">
            <p class="label-info">Введите ISN</p>
            <input class="input-sm" id="isn" type="text" size="45">
            <br>

            <p class="label-info">Введите автора</p>
            <input class="input-sm" id="author" type="text" size="45">
            <br>

            <p class="label-info">Введите название</p>
            <input class="input-sm" id="title" type="text" size="45">
            <br>
        </div>
        <br>
        <button class="btn-default" onclick="confirmBook()">Подтвердить</button>
    </div>

    <div id="dialogBookChange" class="window">
        Изменение данных по книге.
        <a href="#" class="close"/>Закрыть</a>
        <div class="input-group">
            <p class="label-info">Введите ISN</p>
            <input class="input-sm" id="changeIsn" type="text" size="45">
            <br>

            <p class="label-info">Введите автора</p>
            <input class="input-sm" id="changeAuthor" type="text" size="45">
            <br>

            <p class="label-info">Введите название</p>
            <input class="input-sm" id="changeTitle" type="text" size="45">
            <br>
        </div>
        <br>
        <button class="btn-default" onclick="confirmChangeBookData()">Подтвердить</button>
    </div>


    <div id="mask"></div>
</div>

</body>
</html>
