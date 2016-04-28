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
                        str+="<tr>" +
                        "<td><div id='boxes'><a href='#dialogUserChange' onclick='showModal(this, event)'>"+ result[i].name + "</a></div></td>" +
                        "<td><button onclick='deleteUser(this)'>Удалить польтзователя</button></td>"    +
                        "</tr>";
                    }
                    str+="</table>";
                    $('#usersTable').html(str);
                },
            error:
                function(result){
                    console.log("Не удалось загрузить таблицу пользователей")
                }
        }
    )
}

function deleteUser(c){

    if (!confirm("Вы точно хотите удалить?")){
        return;
    }
    var context = c.parentNode;
    var con = context.parentNode;
    var id = users[con.rowIndex-1].id;
    $.ajax({
        type:'POST',
        url:'/deleteUser',
        data:'id=' + id,
        success:
            function(result){
                loadUsers();
            },
        error:
            function(){
                console.log("Не получилось удалить пользователя.");
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
                if (result.status == 403){
                    alert("Пользователь с таким именем уже существует")
                }
                console.log("Пользователь с таким именем уже существует!");
            }
    });
}

function confirmAddUser(){
    var login = $("#login").val();
    var password = $("#password").val();
    addUser(login,password);
}

function confirmChangeUserData(){
    var login = $("#changeLogin").val();
    var password = $("#changePassword").val();
    changeUserData(password,login);
}

function changeUserData(password, login){
    $.ajax({
        type:'POST',
        url:'/changeUser',
        data: 'login=' + login + '&password=' + password,
        success:
            function(result){
                loadUsers();
            },
        error:
            function(result){
                console.log("Не удалось изменить данные пользователя")
            }
    })
}
