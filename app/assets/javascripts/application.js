//= require jquery
//= require jquery_ujs
//= require_tree .


var questionNumber = 0;
var score = 0;

function getQuestion() {
  $.get("/quizzes/1/questions", function (data, i) {
      $('h1').empty();
      $('.submit').remove();
      $('.answers').empty();
      $('#next').remove();

      $('.question').append('<h1>' + data[questionNumber].description + '</h1>');
      $('.nav').append('<button class="btn btn-primary submit">Submit</button>');
      $.each(data[questionNumber].possible_answers, function (i, answer) {
        $('.answers').append('<button class="btn btn-default" value="' + answer.description + '" id="' + answer.description + '">' + answer.description + '</button>')
      })
    }
  );
}


function nextQuestion() {
  $(document).on('click', "#next", function () {
    var quizLength = 0;
    $.get("/quizzes/1/questions", function (data) {
      $.each(data, function () {
        quizLength++;
      });
      console.log(questionNumber);
      console.log(quizLength);
      if (questionNumber < (quizLength-1)) {
        questionNumber++;
        getQuestion();
      } else {
        $('h1').empty();
        $('.submit').remove();
        $('.answers').empty();
        $('#next').remove();
        $('.score').append('<h1>Score:' + score + '</h1>')
        console.log("finsihed")
      }

    })
  })
}

function checkAnswer() {

  $(document).on('click', ".btn-default", function () {
    var button = this;
    var answer = this.value;
    $(document).on('click', ".submit", function () {
      $.get("/quizzes/1/questions", function (data) {
        $.each(data[questionNumber].possible_answers, function (i, ans) {
          if (ans.description === answer) {
            if (ans.correct === true) {
              $(button).removeClass('btn-default').addClass('btn-success');
              score++;
              console.log(score);
              $('.submit').remove();
              $('#next').remove();
              $('.nav').append('<button class="btn btn-primary" id="next">Next Question</button>')
            }
            else {
              $(button).removeClass('btn-default').addClass('btn-danger');
              $('.submit').remove();
              $('#next').remove();
              $('.nav').append('<button class="btn btn-primary" id="next">Next Question</button>')
            }

          }
        });
      });

    });
  });
}


$(document).ready(function () {
  getQuestion();
  checkAnswer();
  nextQuestion();

});

