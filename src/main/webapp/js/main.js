







function login(){

    var a = "ffgf";
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/getLogin',
        success:
            function(result){
                alert(result);
                var y = 8;
            },
        error:
            function(result){
                alert(result);
                var ys = 8;
            }
    })
}

















