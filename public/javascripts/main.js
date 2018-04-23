

$(window).on('load',function(){
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



    const socket = io.connect('localhost:80', {
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

    socket.on('loser',()=>{
        $('.count1').html("You lose");
    });

    socket.on('count2',(data) => {
        $('.count2').html(data.count2);

    });


    socket.on('useThisData',(data)=>{
        $('.speedCount').html(data.speed);
        $('.rangeCount').html(data.range);
    });

    socket.on('startCount',()=>{

        $('#exampleModalLong').modal('hide');
        $('.modal-backdrop').hide();


        $('#exampleModalLong2').modal('show');
        let number = 5;
        setInterval(()=>{
            number--;
            $('.backCount').html(number);
            if(number == 0){

                $('#exampleModalLong2').modal('hide');
            }
        }, 1000);



    });

    $('#createNewRoom').on('click', () => {



        let roomname = $('#roomnamec').val();
        let range = $('.rangeConfig').val();
        let speed = $('.speedConfig').val();
        $('.nameOfRoom').html(roomname);
        $('.speedCount').html(speed);
        $('.rangeCount').html(range);

        if(!speed){
            speed = 1;
            $('.speedCount').html("1");
        }

        if(!range){
            range = 50;
            $('.rangeCount').html("50");
        }
        socket.emit('createroom',{roomname : roomname , range : range, speed : speed});



        socket.on('roomExist', (data) => {
            alert(data.status);
            location.reload();
        } );

        socket.on('roomdata',(data) => {
            $('.countOfRoom').html(data.userCount);
            $('.rangeCount').html(data.range);
            $('.speedCount').html(data.speed);


        });

        $('#exampleModalLong').modal('show');
        $('#exampleModalLong').modal({backdrop: 'static', keyboard: false});

    } );

    socket.on('roomOkey',()=>{
        let roomname = $('#roomnamec').val();
        let range = $('.rangeConfig').val();
        let speed = $('.speedConfig').val();
        socket.emit('allData',{roomname : roomname , range : range, speed : speed});
    });

    $('.joinRoom').on('click', ()=> {
        let roomname = $('#roomname').val();
        $('.nameOfRoom').html(roomname);
        socket.emit('joinRoom',{roomname});

        socket.on('roomExist', (data) => {
            window.alert(data.status);
            location.reload();
        } );

        socket.emit('joined',{roomname});

    });


    socket.emit('roomx',{name :  $('#roomname').val()});
    socket.on('roomdata',(data) => {
        $('.countOfRoom').html(data.userCount);
        $('.rangeCount').html(data.range);
        $('.speedCount').html(data.speed);
    });

    $('.counter1').on('click', () => {

        let range = parseInt($(".rangeCount").text());
        let speed = parseInt($(".speedCount").text());

        let count = parseInt($('.count1').text());
        if(game && !isNaN(count)){
            let room =  $('.nameOfRoom').text();
            count+=speed;
            socket.emit('count', {count});
            if(count >= range){
                socket.emit('lose');
                $('.count1').html("You win");
                game = false;
            }else{
                $('.count1').html(count);
            }
        }
    } );

    socket.on('leaved',()=>{
        $('.countOfRoom').html("1 \n You are alone in the room.");
    });

});

