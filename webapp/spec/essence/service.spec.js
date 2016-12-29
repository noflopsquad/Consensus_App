describe ('A Service', function (){

  beforeEach(function() {
    spyOn(Bus,'publish');
    jasmine.Ajax.install();
    jasmine.addMatchers(reconMatchers);
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it ('implements subscribable',function(){
    var aService = new Service();

    expect(aService._subscribeTo).toBeDefined();
  });

  it ('subcribes on creation',function(){
    var MyService = Component.extend(function(){
      this.subscribed=false;

      this._subscribe=function(){
        this.subscribed = true;
      };
    });

    var aService = new MyService();

    expect(aService.subscribed).toBeTruthy();
  });

  it ('hits, Baby!!',function() {
    var aService = new Service();
    var thePayload = { payload: 'a payload' };

    aService.hit('a url', thePayload, 'a topic');

    var structuredMessage = { header: {}, body: { question: thePayload } }
    expect(structuredMessage).toHaveBeenSentTo('a url');
  });

  it ('delivers, Baby!!',function() {
    var aService = new Service();
    aService.hit('a url', { payload: 'a payload' }, 'a topic');

    jasmine.Ajax.requests.mostRecent().respondWith({
      "status": 200,
      "contentType": "application/json",
      "responseText": JSON.stringify({ body: { answer: { response: "a response" } } })
    });

    expect('a topic').toBeLastTopic();
    expect('a response').toBeIncludedInDataAs('response');
  });
});