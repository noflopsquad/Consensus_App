Questions = CUORE.Class(CUORE.Service, {

    init: function() {
      Questions.parent.init.call(this);
      this.name = 'QUESTIONS';
      this.count = 0;
    },
    
    register: function(text,eventName) {
        this.count = this.count + 1;
        this.emit(eventName,this.count);
    },

    list: function(params,eventName) {
        var questions=[]
        var aQuestion={"text": "una pregunta"};
        
        for (var i = this.count; i > 0; i--) {
            questions.push(aQuestion); 
        };
    
        this.emit(eventName,questions);
    
    },

});