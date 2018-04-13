var Vue = new Vue({
  el: ".app",
  data : {
    count : 0,
    game : 1,
  },
  methods : {
    countinc : function(){
      if(this.count == 9){
        this.game = 0;
        this.count = "Game Over !";
      }else if(this.game == 1){
        this.count++;
      }
    }
  },

});


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