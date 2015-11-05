Question = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this.div = ReactClasses.question();
      this.show=false;
    },

    draw: function(){
      React.render(
        React.createElement(this.div,this._prepareData()),
        document.getElementById(this.container)
      );
      grande.bind(document.querySelectorAll("article.clarifying_question"));
    },

    showEditor: function(){
      this.show=true;
      this.updateRender();
    },

    addressQuestion: function(text){
      this.show=false;
      this.updateRender();
      this.execute("QUESTIONS","register",text);
    },

    _prepareData: function(){
      return{
          "action": this.getText(this.actionKey),
          "placeholder": this.getText(this.placeHolderKey),
          "show": this.show,
          "content": ""
        };
    },


    _internationalize: function(){
      this.actionKey="proposal.question.button";
      this.setI18NKey(this.actionKey);
      this.placeHolderKey="proposal.question.placeHolder";
      this.setI18NKey(this.placeHolderKey);
    },

    _wireEvents: function() {
      this.addExecHandler("show_question_editor","showEditor");
      this.addExecHandler("question_addressed","addressQuestion");
    },

});