var books = null;
var page = 5;

function loadBooks(sortParam, pageParam){

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

function getBook(){

}
