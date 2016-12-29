describe ('A Page', function () {
  
  var MyPage = Page.extend(function() {
    this.sequence = "";

    this._servicesUp = function() {
      this.sequence += "Services,";
    };

    this._componentsUp = function() {
      this.sequence += " Components,";
    };

    this._UIUp = function() {
      this.sequence += " and UI";
    };
  });

  it ('initializes Services, Components and UI in sequence',function(){
    var aPage = new MyPage();

    expect(aPage.sequence).toEqual('Services, Components, and UI');
  });
});