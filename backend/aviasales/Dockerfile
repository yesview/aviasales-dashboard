FROM ubuntu:16.04

COPY ./ /opt/aviasales-dashboard/api

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

WORKDIR /opt/aviasales-dashboard/api

RUN apt-get update && \
    apt-get --no-install-recommends install build-essential python3-dev python3-pip python3-setuptools python3-apt curl -y && \
    pip3 install wheel && \
    pip3 install -r requirements.txt && \
    adduser --system --no-create-home --disabled-login --group aviasales-dashboard && \
    chown -R aviasales-dashboard:aviasales-dashboard /opt/aviasales-dashboard && \
    rm -rf /var/lib/apt/lists/* && export PYTHONPATH=/opt/aviasales-dashboard/api/

USER aviasales-dashboard

CMD ["uwsgi", "--ini", "wsgi.ini"]