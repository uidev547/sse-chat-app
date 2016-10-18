if (!!window.EventSource) {
    var source = new EventSource('./messages');
    source.addEventListener('message', function(e) {
      console.log(e.data);
    }, false);

    source.addEventListener('open', function(e) {
      /*fetch('/messages/post', {
        method: "post",
        body: JSON.stringify({
          message: "message_" + new Date()
        })
      })
      .then((res)=>{
        console.log( 'response', res );
      })*/
      $.ajax({
        url: "/messages/post",
        method: "POST",
        data: {
          message: "message_" + new Date()
        }
      })

    }, false);

    source.addEventListener('error', function(e) {
      if (e.readyState == EventSource.CLOSED) {
        fetch('/messages/close')
        .then( (res)=> {
          console.log( 'response', res );
        } )
      }
    }, false);

} else {
  // Result to xhr polling :(
}



