describe ('An Authorized', function (){

  var aService;

  beforeEach(function() {
    spyOn(Bus,'publish');
    jasmine.Ajax.install();
    jasmine.addMatchers(reconMatchers);
    aService = new Authorized();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it ('sends accredited messages',function(){
    localStorage.setItem('session_token','aSession');

    var thePayload = { payload: 'a payload' };
    var accredited = { header: { session_token: 'aSession' }, body: { question: { payload: 'a payload' } } };
    aService.hit('a url',thePayload,'a topic');

    expect(accredited).toHaveBeenSentTo('a url');
    localStorage.clear();
  });

  it('updates end of session',function(){
    var success = {
      "status": 200,
      "contentType": "application/json",
      "responseText": JSON.stringify({ header: { end_of_session: 'an_end' }, body: { answer: {} } })
    };
    aService.hit('a url', { payload: 'a payload' }, 'a topic')

    jasmine.Ajax.requests.mostRecent().respondWith(success);

    expect('end_of_session.delayed').toBeLastTopicIn('auth');
    expect('an_end').toBeIncludedInDataAs('end_of_session');
  });

  describe(' when non authorized error ', function() {

    it('publishes the error', function() {
      var unauthorized = {
        "status": 200,
        "contentType": "application/json",
        "responseText": JSON.stringify({ header: {}, body: { answer: { error: "unauthorized" } } })
      };
      aService.hit('a url', { payload: 'a payload' },'a topic');

      jasmine.Ajax.requests.mostRecent().respondWith(unauthorized);

      expect('session.invalid').toBeLastTopicIn('auth');
    });

  });

});