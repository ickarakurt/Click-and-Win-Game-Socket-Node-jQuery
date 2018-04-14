


$('#createRoom').on('click', () => {
  $('.create').show();
  $('.join').hide();

} );



$('#config').on('click', () => {
  $('.configs').toggle('slow');
} );





$('#joinRoom').on('click', () => {

  $('.create').hide();
  $('.join').show();

} );


$(window).on('load',function(){
  $('#exampleModalCenter').addClass('animated fadeOut');
  $('#exampleModalCenter').modal('show');
  $('#exampleModalCenter').modal({backdrop: 'static', keyboard: false});  
  $('.configs').hide();

 
});

$(() => {
    const socket = io.connect('http://localhost:3000', {
        reconnectionAttempts: 4,
        reconnectionDelay: 3000,
        // reconnection: false
    });
    socket.on('reconnect_attempt', () => {
        console.log('Trying reconnect...');
    });
    socket.on('reconnect_error', () => {
        setTimeout(() => {
            console.log('Trying reconnect failed..');
        },1500);
    });
    socket.on('reconnect', () => {
        console.log('Connected.');
    });



    $('#createNewRoom').on('click', () => {

        let roomname = $('#roomnamec').val();
        let range = $('.rangeConfig').val();
        let speed = $('.speedConfig').val();

        if(!speed){
            speed = 1;
        }

        if(!range){
            range = 50;
        }
        socket.emit('createroom',{roomname : roomname , range : range, speed : speed});

        socket.on('roomExist', (data) => {
            alert(data.status);
            location.reload();
        } );

        socket.on('roomdata',(data) => {
            console.log(data.roomdata);
        });
    } );

    $('.joinRoom').on('click', ()=> {
        let roomname = $('#roomname').val();
        socket.emit('joinRoom',{roomname});

        socket.on('roomExist', (data) => {
            alert(data.status);
            location.reload();
        } );

        socket.on('roomdata',(data) => {
            console.log(data.roomdata);
        });
    });



});
