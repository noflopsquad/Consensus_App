Proposal = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this.adviceShown=false;
      this.mode=this.EDIT;
      this.div = ReactClasses.proposal();
    },

    draw: function(){
      React.render(
        React.createElement(this.div,this._prepareData()),
        document.getElementById(this.container)
      );

      grande.bind(document.querySelectorAll("article.edit"));
    },

    _prepareData: function(){
      return{
          "proposal": HTML_LOREM_IPSUM,
          "action": this.getText(this.buttonKey),
          "ask": this.getText(this.askKey),
          "showAdvice": this.adviceShown,
          "advice": this.getText(this.adviceKey),
          "mode": this.mode,
        };
    },


    submitProposal: function(text){
      if (this._isFirstTry()){
        this._showAdvice();
      }
      else{
        this._registerProposal(text);
      }
    },

    _isFirstTry: function(){
      return !this.adviceShown
    },

    chooseMode: function(proposal){
      if(proposal){
        this.mode="show";
      }
      else{
        this.mode="edit";
      }

      this.updateRender(); 
    },

    _showAdvice: function(){
      this.adviceShown = true;
      this.updateRender(); 
    },

    _registerProposal: function(text){
      this.execute("PROPOSALS","register",text);
    },

    _internationalize: function(){
      this.buttonKey="proposal.button";
      this.adviceKey="proposal.advice";
      this.askKey="proposal.ask";
      
      this.setI18NKey(this.buttonKey);
      this.setI18NKey(this.adviceKey);
      this.setI18NKey(this.askKey);
    },

    _wireEvents: function() {
      this.addExecHandler("proposal_submit","submitProposal");
      this.addExecHandler("PROPOSALS_register_EXECUTED","chooseMode");
      this.addExecHandler("PROPOSALS_current_EXECUTED","chooseMode");
    },

    onEnvironmentUp: function(page) {
      this.execute("PROPOSALS","current");
    },

});