$(document).on('turbolinks:load', function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                  </div>
                </div>`
    return html;
  }

  function destroyUser(user){
    var html = `<div class='chat-group-user'>
                 <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                 <p class='chat-group-user__name'>${user.userName}</p>
                 <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                 削除</div>
                </div>`
    return html;
  }

    $("#user-search-field").on("keyup",function() {
      var input = $("#user-search-field").val();
      var href = '/users'
      
      $.ajax({
        type: 'GET',
        url: href,
        data: { keyword: input },
        dataType: 'json'
      })
  

      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !==0) {
          // フォーム下に要素を追加していく。
          users.forEach(function(user){
            var html = appendUser(user);
            $('#user-search-result').append(html);  
          })
        }

        if(input.length === 0 ){
          $('#user-search-result').empty();
        }
       })

       .fail(function(){
       alert('検索に失敗しました');
       });
    });

      // 追加ボタンにイベントを発火させる
      $('#user-search-result').on('click','.user-search-add',function(){
        var add_data = $(this).data();
        var html = destroyUser(add_data);
        $('#user-add-result').append(html);
        $(this).parent().remove();
      });

      $('#user-add-result').on('click','.user-search-remove',function(){
        $(this).parent().remove();
      })
});