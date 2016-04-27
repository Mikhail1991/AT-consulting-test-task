
function loadBooks(sortParam){
    sortParam = "author";
    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/books',
            data: 'sortParam='+ sortParam,
            success:
                function(result){
                    var button = "";
                    var str = "<table> " + "<tr>" +
                        "<th> ISN </th>" +
                        "<th> Автор </th>" +
                        "<th> Название </th>" +
                        "<th> Кем взята </th>" +
                        "<th> Удалить </th>" +
                        "</tr>";

                    for (var i=0;i<result.length;++i){

                        if (result[i].owner == 'busy'){
                            button = "<button onclick='getBook()'>Взять книгу</button>";
                        } else {
                            button = "<button onclick='returnBook()'>Отдать книгу</button>"
                        }
                        str+="<tr>" +
                        "<td>" + result[i].isn + "</td>" +
                        "<td>" + result[i].author + "</td>" +
                        "<td>" + result[i].title + "</td>" +
                        "<td>" +  button + "</td>" +
                        "<td><button onclick='deleteBook()'>Удалить</button></td>" +
                        + "</tr>";
                    }
                    str+="</table>";
                    $('#booksTable').html(str);
                },
            error:
                function(result){
                    var s = result;

                    document.write(s.statusText);
                }
        }
    )
}

function sort(param){
    alert(param)
}


function loadUsers(){
    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/users',
            success:
                function(result){

                    var str = "<table> " + "<tr>" +
                        "<th> name </th>" + "<th> surname </th>"  + "</tr>";

                    for (var i=0;i<result.length;++i){
                        str+="<tr>" +
                        "<td>"+  result[i].name + "</td>" +
                        "<td>"+ result[i].surname + "</td>" +
                        "</tr>";
                    }
                    str+="</table>";
                    $('#usersTable').html(str);
                },
            error:
                function(result){
                    var s = result;
                    document.write(s.statusText);
                }
        }
    )
}

function returnBook(){
    $.ajax({
        type: 'POST',
        dataType:'json',
        url:'/returnBook',
        success:
            function(result){
                alert('Успех')
            },
        error:
            function(result){
                alert('Неуспех')
            }
    });
}

function getBook(){

}

function deleteBook(id){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/deleteBook',
        data: 'id=' + id,
        success:
            function(result){
                alert('Книга удалена')
            },
        error:
            function(result){
                alert('Книга не удалена')
            }
    })
}

function addUser(login,password){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/addUser',
        data: 'login='+ login+'&password='+ password,
        success:
            function(result){
                alert('Пользователь добавлен')
            },
        error:
            function(result){
                alert('Пользователь не добавлен')
            }
    })
}

function confirm(){
    var login = $("#login").val();
    var password = $("#password").val();
    addUser(login,password);
}


function addBook(isn, author, title){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/addBook',
        data: 'isn='+ isn+'&author='+ author + '&title' + title,
        success:
            function(result){
                alert('Пользователь добавлен')
            },
        error:
            function(result){
                alert('Пользователь не добавлен')
            }
    });
}

function confirmBook(){
    var isn = $("#isn").val();
    var author = $("#author").val();
    var title = $("#title").val();
    addBook(isn, author, title)
}/**
 * Created by Mike on 27.04.2016.
 */
