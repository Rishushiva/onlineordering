$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('.navbar-custom');
   var offset = startchange.offset();
   var scroll_start_modal=0;
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top ) {
          $('.navbar-custom').css('background-color', 'rgba(34,34,34,0.9)');
       } else {
          $('.navbar-custom').css('background-color', 'transparent');
       }
   });
   
    /*$('.setscroll').scroll(function(){
       scroll_start_modal=$('.setscroll').scrollTop();
       if(scroll_start_modal>0){
        //$('.modal-header-head').css('background-color', 'white');
       }
     });*/
$(".main-button").on('click',function(){
    $("#myModal").modal("hide");
    $('.loading-icon').show();
    $.getJSON('https://api.myjson.com/bins/inq1d', function(data){
    dataAjax=data;
    for(var i=0;i<data.length;i++){
      datause=data[i];
      renderHtml(datause);  
    }
    }).done(function(){
        setTimeout(function(){
        $('.loading-icon').hide();
        $('#myModal').modal('show');
      },20);
      });
  });
   function renderHtml(datause){
         var htmlPizza="";
         htmlPizza+='<div class="container-fluid"><div class="'+datause.type+'div">'
         htmlPizza+='<div class="row">'+'<h3 class="tagname">';
         htmlPizza+=datause.type.toUpperCase()+'</h3>';
         htmlPizza+='<div class="col-md-6 '+datause.type+'-left"></div>';
         htmlPizza+='<div class="col-md-6 '+datause.type+'-right">';
         htmlPizza+='<img src="'+datause["main-image-src"]+'" class="main-food-image">';
         htmlPizza+='</div></div></div></div>'
         $('.modal-body').find('#add-external').append(htmlPizza);
         for(var i=0; i<datause.menu.length;i++){
          var newItem='';
          newItem+='<a href="#">'+'<div class="inner">';
          newItem+='<h5>'+datause.menu[i].name;
          if(datause.menu[i].hasOwnProperty("src")){
            newItem+='<img src="'+datause.menu[i].src+'" class="food-image">';
          }
          newItem+='</h5>';
          if(datause.menu[i].variety){
          newItem+='<h6>'+datause.menu[i].variety+'</h6>';
          }
          newItem+='<div class="price">'+datause.menu[i].price+'</div>';
          newItem+='<div class="clear"></div></div>';
          newItem+='</a>';
          if(i<4 && datause.menu[i].name!="Spaghetti carbonara" && datause.menu[i].name!='Ice cream' || datause.menu[i].name=='Apple Juice'){
            $('.modal-body').find("."+datause.type+"-left").append(newItem);
          }
          else{
            $('.modal-body').find("."+datause.type+"-right").append(newItem);
          }
         };
        };
  $('.pasta').on('click',function(){
    //var modalOldHtml=$('.modal-dialog').html();
    $('.modal-body').find('.menu-big-icon').hide();
    $('.modal-body').find('#add-external').html('');
    var pizzaMenu='<div class="pasta menuImgDisplay"></div>';
    $('.modal-header').css('height','40vh');
    $('.modal-header').html(pizzaMenu);
    $('.modal-body').find('#add-external').html(renderHtml(dataAjax[0]));
  });
  $(document).on('click','.pizzadiv a',function(){
  //var itemFullDetail='<div class="col-md-6">';
    //itemFullDetail+='<img src="'+$('img:first',this).attr('src')+'" class="item-image-det">';
    //itemFullDetail+='<h5>'+$(this).children('h6').html() +
    console.log($(this).find('h6').html());
  });
  $('.close-modal').on('click',function(){
    $('#add-external').html('');
  });
});