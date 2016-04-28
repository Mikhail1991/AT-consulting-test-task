var books = null;
var page = 5;
var currentUser = "";

function getLogin(){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/getLogin',
        success:
            function(result){
                currentUser = result.name;
            },
        error:
            function(result){
                alert("Ошибка при получении текущего пользователя");
            }
    })
}

function loadBooks(sortParam, pageParam){
    getLogin();
    if (sortParam == null){
        sortParam = "author";
        $("#authorSort").css('backgroundColor', 'darkgreen');
    }

    if (pageParam == null){
        pageParam = 5;
    }

    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/books',
            data: 'sortParam='+ sortParam +'&pageParam='+ pageParam,
            success:
                function(result){
                    books = null;
                    books = result;
                    var button = "";
                    var str = "<table id='bookTable'> " + "<tr>" +
                        "<th> ISN </th>" +
                        "<th><div id='authorSort' onclick='sortAuthor()'>Автор </div> </th>" +
                        "<th><div id='name' onclick='sortName()'>Название </div> </th>" +
                        "<th> Кем взята </th>" +
                        "<th> Удалить </th>" +
                        "</tr>";

                    for (var i=0;i<result.length;++i){

                        switch (result[i].owner){
                            case null:
                                button = "<button onclick='getBook(this)'>Взять книгу</button>";
                                break;
                            case currentUser:
                                button = "<button onclick='returnBook(this)'>Отдать книгу</button>";
                                break;
                            default :
                                button = result[i].owner;

                        }

                        /*
                        if (result[i].owner == null){
                            button = "<button onclick='getBook()'>Взять книгу</button>";
                        }
                        if (result[i].owner == currentUser){
                            button = "<button onclick='returnBook()'>Отдать книгу</button>"
                        } else {
                        }
                        */

                        str+="<tr>" +
                        "<td>" + result[i].isn + "</td>" +
                        "<td>" + result[i].author + "</td>" +
                        "<td>" + result[i].title + "</td>" +
                        "<td>" +  button + "</td>" +
                        "<td><button onclick='deleteBook(this)'>Удалить</button></td>" +
                        + "</tr>";
                    }
                    str+="</table>";
                    $('#booksTable').html(str);
                },
            error:
                function(result){
                    var s = result;

                }
        }
    )
}

function deleteBook(con){

    if (!confirm("Вы точно хотите удалить?")){
        return;
    }
    var c = con.parentNode;
    var cc = c.parentNode;
    var id = books[cc.rowIndex-1].id;
    $.ajax({
        type:'POST',
        url:'/deleteBook',
        data: 'id=' + id,
        success:
            function(result){
                loadBooks();
            },
        error:
            function(result){
                alert("Не удалось удалить книгу")
            }
    });

}


function addBook(isn, author, title){
    $.ajax({
        type:'POST',
        url:'/addBook',
        data: 'isn='+ isn +'&author='+ author + '&title=' + title,
        success:
            function(result){
                loadBooks();
            },
        error:
            function(result){
                alert("НЕ удалось добваить книгу")
            }
    });

}

function confirmBook(){
    var isn = $("#isn").val();
    var author = $("#author").val();
    var title = $("#title").val();
    addBook(isn, author, title)
}

function getBook(con){
    var c = con.parentNode;
    var cc = c.parentNode;
    var id = books[cc.rowIndex-1].id;
    $.ajax({
        type:'POST',
        url:'/getBook',
        data: 'id=' + id + '&user=' + currentUser,
        success:
            function(result){
                loadBooks();
            },
        error:
            function(result){

            }
    })
}


function returnBook(con){
    var c = con.parentNode;
    var cc = c.parentNode;
    var id = books[cc.rowIndex-1].id;
    $.ajax({
        type: 'POST',
        url:'/returnBook',
        data:'id=' + id + '&user=' + currentUser,
        success:
            function(result){
                loadBooks();
            },
        error:
            function(result){
            }
    });
}

function sortAuthor(){
    $("#authorSort").css('backgroundColor', 'darkgreen');
    $("#name").css('backgroundColor', 'white');
    loadBooks('author',page);
}

function sortName(){
    $("#name").css('backgroundColor', 'darkgreen');
    $("#authorSort").css('backgroundColor', 'white');
    loadBooks('title',page);
}

function getNextPage(){
    page+=5;
    loadBooks(null,page);
}

