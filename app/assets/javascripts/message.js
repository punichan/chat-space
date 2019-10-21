$(document).on('turbolinks:load', function() {

    function buildMessageHTML(message){

      var content = message.content ? `${message.content}` : "";
      var img = message.image.url ? `<img src= "${message.image.url}" class="lower-message__image">`: "";
      var html =`<div class="contents__right__body__box" data-id=${message.id}'>
                      <div class="contents__right__body__box__message">
                        <div class="contents__right__body__box__message__username">
                          ${message.user_name} 
                        </div>
                        <div class="contents__right__body__box__message__date">
                          ${message.created_at}
                        </div>
                     </div>
                     <div class="contents__right__body__box__comment">
                       ${content}
                       ${img}
                     </div>
                     </div>`
      return html;
    };
    

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessageHTML(message);
      $('.contents__right__body').append(html);
      $('.contents__right__body').animate({
        scrollTop: $('.contents__right__body')[0].scrollHeight
      });
      $('#new_message')[0].reset();
      $('.contents__right__footer__textbox__btn').attr('disabled',false);
    })
    .fail(function(){
      alert('error');
      $('.contents__right__footer__textbox__btn').attr('disabled',false);
    })
  });

  //  自動更新
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".contents__right__body__box:last").data("id");
    console.log(last_message_id
      )
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      //メッセージが入ったHTMLを取得
      //メッセージを追加
      messages.forEach(function(message){
        var insertHTML = buildMessageHTML(message);
        console.log("1");
        $('.contents__right__body').append(insertHTML);
        $('.contents__right__body').animate({
          scrollTop: $('.contents__right__body')[0].scrollHeight
          
        });
      })
    })

    .fail(function() {
     alert('error');
    });
  };
};
  setInterval(reloadMessages,10000);
});

