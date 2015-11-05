QuestionList = CUORE.Class(CUORE.Component, {

    _startState:  function() {
      this.div = ReactClasses.questionList();
    },

    draw: function(){
      React.render(
        React.createElement(this.div,this._prepareData()),
        document.getElementById(this.container)
      );
    },

    _prepareData: function(){
      return{
          "header": this.getText(this.headerKey),
          "questions": this.questions
        };
    },


    _internationalize: function(){
      this.headerKey="question.list.header";
      this.setI18NKey(this.headerKey);
    },

    _wireEvents: function() {
      this.dispatchUsing("getQuestions", "QUESTIONS_register_EXECUTED");
      this.dispatchUsing("showQuestions", "QUESTIONS_list_EXECUTED");
    },

    onEnvironmentUp: function(page) {
      page.getService("QUESTIONS").execute("list");
    },

    getQuestions: function() {
      this.execute("QUESTIONS","list");
    },

    showQuestions: function(questions) {
      this.questions = questions;
      this.updateRender();
    }

});