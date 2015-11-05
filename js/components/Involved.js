Involved = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this.storeKey="person.involved.name";
      this.div = ReactClasses.involved();
      this.involved = "the person involved";
    },

    _wireEvents: function() {
      this.dispatchUsing("updateInvolved","NAMES_generate_EXECUTED");
    },

    draw: function(){
      var container=this.container;
      var box = this.div;
     

      React.render(
        React.createElement(box,{"name": this.involved}),
        document.getElementById(container)
      );
    },

    updateInvolved: function(response) {
      this._setName(response);
      this.updateRender();
    },

    _setName: function(name) {
      this.involved = name;
      this._saveName();
    },

    _saveName: function(){
      document.page.save(this.storeKey, this.involved);
    },
    
    onEnvironmentUp: function(page) {
      var savedName=page.retrieve(this.storeKey);
      if (savedName){
        this.updateInvolved(savedName);
        return;
      }
      this.execute("NAMES","generate");
    },

});