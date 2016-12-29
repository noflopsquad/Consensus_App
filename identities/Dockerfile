FROM ruby

ENV app /myapp

RUN mkdir -p $app

WORKDIR $app

ADD startup.sh /

CMD ["/bin/bash", "/startup.sh"]