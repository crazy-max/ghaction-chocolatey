# syntax=docker/dockerfile:1

ARG CHOCOLATEY_VERSION="2.1.0"
ARG ALPINE_VERSION="3.17"



FROM alpine:${ALPINE_VERSION}

WORKDIR /opt/chocolatey

RUN apk add --no-cache curl
RUN apk --update --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/edge/testing add mono-dev \
  && apk --update --no-cache add -t build-dependencies ca-certificates \
  && cert-sync /etc/ssl/certs/ca-certificates.crt \
  && ln -sf /opt /opt/chocolatey/opt \
  && mkdir -p /opt/chocolatey/lib \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*

ARG CHOCOLATEY_VERSION

RUN curl -sSL "https://github.com/chocolatey/choco/releases/download/${CHOCOLATEY_VERSION}/chocolatey.v${CHOCOLATEY_VERSION}.tar.gz" | tar xz

COPY entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
