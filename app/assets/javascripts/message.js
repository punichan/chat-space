$(function(){
  function buildHTML(message){
    // # config.assets.js_compressor = :uglifier
    var html = `<div class="contents__right__body__box">
    <div class="contents__right__body__box__message">
    <p class="contents__right__body__box__message__username">
    ${message.username}
    </p>
    <p class="contents__right__body__box__message__date">
    ${message.created_at}
    </p>
    </div>
    <div class="contents__right__body__box__comment">
    ${message.content}
    ${message.image}
    </div>
    </div>`
   return html;
  }

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
      var html = buildHTML(message);
      console.log(message)
      $('.contents__right__body').append(html)
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
  })
});