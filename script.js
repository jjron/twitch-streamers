$(document).ready(function(){
  var streamers = [
    "freecodecamp", "lionheartx10", "ESL_SC2", "OgamingSC2",
    "cretetion", "storbeck", "habathcx", "warriorofsparta",
    "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"
  ];

  var switchFlag = 1;
  $("#sw1").on("click", function(){
    if (switchFlag === 2){
      $(this).animate({right: '0px'});
      $("#sw2").animate({right: '50px'});
      $(".sleeping").slideDown();
      $(".closed").slideDown();
    } else if (switchFlag === 3){
      $(this).animate({right: '0px'});
      $("#sw3").animate({right: '50px'});
      $(".streaming").slideDown();
    }
    switchFlag = 1;
  });

  $("#sw2").on("click", function(){
    if (switchFlag === 1){
      $(this).animate({right: '0px'});
      $("#sw1").animate({right: '50px'});
      $(".sleeping").slideUp();
      $(".closed").slideUp();
    } else if (switchFlag === 3){
      $(this).animate({right: '0px'});
      $("#sw3").animate({right: '50px'});
      $(".sleeping").slideUp();
      $(".closed").slideUp();
      $(".streaming").slideDown();
    }
    switchFlag = 2;
  });

  $("#sw3").on("click", function(){
    if (switchFlag === 1){
      $(this).animate({right: '0px'});
      $("#sw1").animate({right: '50px'});
      $(".streaming").slideUp();
    } else if (switchFlag === 2){
      $(this).animate({right: '0px'});
      $("#sw2").animate({right: '50px'});
      $(".streaming").slideUp();
      $(".sleeping").slideDown();
      $(".closed").slideDown();
    }
    switchFlag = 3;
  });

  for (var i = 0; i < streamers.length; i++){
    (function(i){ // protects i
      $.getJSON("https://api.twitch.tv/kraken/channels/"+streamers[i]+"?callback=?", function(data){
        var logo;
        if (data.status === 422){
          logo = "https://d1iu1mag0u723c.cloudfront.net/assets/no-avatar-25359d55aa3c93ab3466622fd2ce712d.jpg";
        } else {
          logo = data.logo;
        }
        var streamerName = data.display_name;
        var game = data.game;
        var status = data.status;
        if (game === undefined){
          $("#streamers").append("<div class='channel closed'><img class='logo' src="+logo+"><h4>"+streamers[i]+"</h4><em>Account does not exist</em></div>");
        } else if (game === null){
          $("#streamers").append("<div class='channel sleeping'><img class='logo' src="+logo+"><h4>"+streamerName+"</h4><em>Offline</em></div>");
        } else {
          $("#streamers").append("<div class='channel streaming'><img class='logo' src="+logo+"><h4>"+streamerName+"</h4><div class='streamInfo'><a href="+data.url+" target='_blank'><p><b>"+game+"</b><br>"+status+"</p></a></div></div>");
        }
      }); // end of getJSON
    })(i);
  } // end of for loop
});
