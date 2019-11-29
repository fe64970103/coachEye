
$(function() {
    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true
    });
  
    $(".trigger").click(function(){
        $("#datepicker").datepicker("show");
    });     
});



