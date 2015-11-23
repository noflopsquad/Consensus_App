Renderers={
  makeCuoreRenderer: function(renderer){
    return {
      renderer: renderer,
      doRender: function(container, data){
          React.render(
            React.createElement(this.renderer,data),
            document.getElementById(container)
          );
      }
    }
  },

  involved: function(){
    var comment = React.createClass({
      displayName: "Involved",
      render: function() {
        return (React.createElement("p",{className: "navbar-text"},this.props.name));
      }
    });
    return Renderers.makeCuoreRenderer(comment);
  },

  clarifyingQuestion: function(){
    var question = React.createClass({
      displayName: "ClarifyingQuestion",
      render: function() {
        return (React.createElement("p",null,this.props.text));
      }
    });
    return question;
  },

  questionList: function(){
    var list = React.createClass({
      displayName: "QuestionList",

      render: function() {
        return (
          React.createElement("span",{
              "className": this.hidden()
            }, 
            React.createElement("h2",null,this.props.header),
            this.renderQuestions()
          )
        );
      },

      renderQuestions: function(){
        var questions = this.props.questions.map(function (aQuestion) {
            return (
              React.createElement(Renderers.clarifyingQuestion(), aQuestion)
            );
          });
        return questions;
      },

      hidden: function () {
        var hidden="";
        if (this.props.questions.length == 0 ) hidden="hidden";
        return hidden;
      },

    });
    return Renderers.makeCuoreRenderer(list);
  },


  proposal: function(){
    var proposal = React.createClass({
      displayName: "Proposal",
      
      render: function() {
        return (
          React.createElement("span", null, 
            React.createElement("article", {
              dangerouslySetInnerHTML: {__html: this.props.proposal},
              "className" : this.props.mode,
              "onMouseDown": this.getEvent()
            }),
            this.getAdvice(),
            this.getButton()
          )
        );
      },

      send: function() {
        CUORE.Bus.emit("proposal_submit", this.retrieveText());
      },

      ask: function() {
        CUORE.Bus.emit("show_question_editor") ;
      },

      prevent: function(e) {
        e.preventDefault();
      },

      getEvent: function() {
        var result=function(){};
        if (this.inShowMode()) result = this.prevent;
        return result;
      },

      getAdvice: function() {
        if ((this.inShowMode()) || (!this.props.showAdvice))return null;
        return React.createElement("p",null,this.props.advice);

      },

      getButton: function(){
        if (this.inShowMode() )return this.questionButton();
        return this.proposalButton();
      },

      proposalButton: function  () {
        return React.createElement("button",{"onClick": this.send},this.props.action);
      },

      questionButton: function  () {
        return React.createElement("button",{"onClick": this.ask},this.props.ask);
      },

      retrieveText: function(){
        var theNode = this.getDOMNode(); 
        return theNode.firstChild.innerHTML;
      },

      inShowMode: function(){
        return this.props.mode == "show"
      }

    });
    return Renderers.makeCuoreRenderer(proposal);
  },

  question: function(){
    var question = React.createClass({
      displayName: "Question",
      
      getInitialState: function  () {
        return {
          "content":this.getContent(),
          "quoted": false
        };
      },

      render: function() {
        return (
          React.createElement("span",{"className": this.hidden()}, 
            React.createElement("article", {
              dangerouslySetInnerHTML: {__html: this.state.content},
              "className": "clarifying_question",
              "onMouseDown": this.quoteProposal 
            }),
            this.questionButton()
          )
        );
      },

      quoteProposal: function  () {
        if (this.state.quoted) return;
        var text = this.retrieveText();
        var stripped = text.replace(this.props.placeholder," ","");
        var stripped = this.includeCitation() + stripped
        this.setState({
          "content": stripped,
          "quoted": true
          });
      },

      includeCitation: function  () {
        var result="";
        var selection = this.getSelected();
        if (selection) result = "<blockquote><cite>"+ this.getSelected() +"</cite></blockquote>";
        this.clearSelected();
        return result;
      },

      clearSelected: function() {
        var text = "";
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else if (document.selection && document.selection.type != "Control") {
          document.selection.empty();
        }
        return text;
      },

      getSelected: function() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
      },

      getContent: function  () {
        if (this.props.content) return this.props.content;
        return this.props.placeholder
      },

      send: function() {
        CUORE.Bus.emit("question_addressed", this.retrieveText());
        this.setState({
          "content": this.props.placeholder,
          "quoted": false
          });
      },

      retrieveText: function(){
        var theNode = this.getDOMNode(); 
        return theNode.firstChild.innerHTML;
      },

      questionButton: function  () {
        return React.createElement("button",{"onClick": this.send},this.props.action);
      },

      hidden: function () {
        var hidden="";
        if (!this.props.show) hidden="hidden";
        return hidden;
      }

    });
    return Renderers.makeCuoreRenderer(question);
  }

};