//= require jquery
//= require jquery_ujs
//= require_tree .


var questionNumber = 0;
var score = 0;

function getQuestions(){
  $.ajax({
    type:"GET",
    url:"/quizzes/1/questions",
    success: (function (questions) {
      $.each(questions, function(i, question){
        $('.question').append(question.description);
        $.each(question.possible_answers, function(i, answer){
          $('.answers').append('<li>' + answer.description + '</li>')
        });
      })
    })
  })
}

function nextQuestion(){}

function checkAnswer(){}

//Event handlers for the buttons
//obj=document.getElementById("startq");
//obj.onclick=getQuestions;
//ans=document.getElementById("submit");
//ans.onclick=checkAnswer;

$(document).ready(function() {

  getQuestions();

});