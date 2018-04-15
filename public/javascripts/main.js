

$(window).on('load',function(){
  $('#exampleModalCenter').addClass('animated fadeOut');
  $('#exampleModalCenter').modal('show');
  $('#exampleModalCenter').modal({backdrop: 'static', keyboard: false});  
  $('.configs').hide();

 
});

$(() => {


    let game = true;


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



    const socket = io.connect('https://159.65.87.2:80', {
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
        $('.nameOfRoom').html(roomname);

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
        $('.nameOfRoom').html(roomname);
        socket.emit('joinRoom',{roomname});

        socket.on('roomExist', (data) => {
            alert(data.status);
            location.reload();
        } );

    });


    $('.counter1').on('click', () => {

        if(game){
            let count = parseInt($('.count1').text());
            let room =  $('.nameOfRoom').text();
            count++;
            socket.emit('count', {count});
            if(count >= 30){
                $('.count1').html("You win");
                game = false;
                alert('You win.');
                socket.emit('lose');
            }else{
                $('.count1').html(count);
            }
        }
    } );

    socket.on('count2',(data) => {
        $('.count2').html(data.count2);


    });

    socket.on('loser',()=>{
        alert('Loserrrrrrr - Game Over');
    });

});
