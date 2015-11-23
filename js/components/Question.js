Question = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this._declareRenderer();
      this.show=false;
    },

    _declareRenderer: function(){
      this.renderer = Renderers.question();
    },

    draw: function(){
      this.doRender();
      grande.bind(document.querySelectorAll("article.clarifying_question"));
    },
    
    doRender: function(){
      this.renderer.doRender(this.container, this._prepareData());
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
      this.dispatchUsing("showEditor", "show_question_editor");
      this.dispatchUsing("addressQuestion", "question_addressed");
    },

});