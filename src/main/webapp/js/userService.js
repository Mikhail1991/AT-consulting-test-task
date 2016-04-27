var users = null;

function loadUsers(){
    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/users',
            success:
                function(result){
                    users = null;
                    users = result;
                    var str = "<table id='userTable'> " + "<tr>" +
                        "<th> name </th>" + "<th> surname </th>"  + "</tr>";

                    for (var i=0;i<result.length;++i){
                        str+="<tr id=i>" +
                        "<td>"+  result[i].name + "</td>" +
                        "<td>"+ result[i].surname + "</td>" +
                        "<td><button onclick='deleteUser(this)'>Удалить польтзователя</button></td>"    +
                        "</tr>";
                    }
                    str+="</table>";
                    $('#usersTable').html(str);
                },
            error:
                function(result){

                }
        }
    )
}

function deleteUser(c){
    var context = c.parentNode;
    var con = context.parentNode;
    //var id = ;
    $.ajax({
        type:'POST',
        url:'/deleteUser',
        data:'id=' + users[con.rowIndex-1].id,
        success:
            function(result){
                loadUsers();
            },
        error:
            function(){
                alert("Не получилось удалить пользователя.")
            }
    });
}

function addUser(login,password){
    $.ajax({
        type:'POST',
        url:'/addUser',
        data: 'login='+ login+'&password='+ password,
        success:
            function(result){
                loadUsers();
            },
        error:
            function(result){
                alert("Пользователь с таким именем уже существует!")
            }
    });
}

function confirmAddUser(){
    var login = $("#login").val();
    var password = $("#password").val();
    addUser(login,password);
}