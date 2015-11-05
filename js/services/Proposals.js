Proposals = CUORE.Class(CUORE.Service, {

    init: function() {
      Proposals.parent.init.call(this);
      this.storeKey="proposal.current";
      this.name = 'PROPOSALS';
    },
    
    register: function(text,eventName) {
        document.page.save(this.storeKey, text);
        this.emit(eventName,text);
    },
    
    current: function(params,eventName) {
        var currentproposal=document.page.retrieve(this.storeKey);
        this.emit(eventName,currentproposal);
    },

});