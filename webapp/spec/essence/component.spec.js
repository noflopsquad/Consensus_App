describe ('A Component', function (){
  
  var testComponent=Component.extend(function(){
    this.sequence='';

    this._subscribe=function(){
      this.sequence += 'subscribe then';
    };

    this._start=function(){
      this.sequence += ' start';
    };
  });

  it ('implements subscribable',function(){
    var aComponent = new Component();

    expect(aComponent._subscribeTo).toBeDefined();
    expect(aComponent._publishAs).toBeDefined();
  });

  it ('implements enrolable',function(){
    var aComponent = new Component();

    expect(aComponent._reactTo).toBeDefined();
    expect(aComponent._announce).toBeDefined();
  });

  it ('ensures subscribe before start',function(){
    var aComponent = new testComponent();
    
    expect(aComponent.sequence).toEqual('subscribe then start');
  });

});