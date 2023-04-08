$('#main-heading').click(function(){
    $('#main-heading').text("Have a Good Time!");
});
$('#hidden-content-container').hide();
$('#CTA-btn').click(function(){  
   $('#hidden-content-container').show();
    console.log("yes");
});