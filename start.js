$(document).ready(function(){
    $(".continue-btn").click(function(){
      $(".sec1").fadeOut();
      $(".sec2").fadeIn();
    });
    $(".start-quiz").click(function(){
      name = $(".input").val();
      if(name === '') {
       alert("Please Enter Your Name")
       return;
      }
      else{
        location.href="quiz.html";
      }
      $(".sec2").fadeOut();
    });
});