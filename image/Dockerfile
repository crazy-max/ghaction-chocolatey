# syntax=docker/dockerfile:1

ARG CHOCOLATEY_VERSION="2.3.0"
ARG ALPINE_VERSION="3.20"

FROM alpine:${ALPINE_VERSION}
WORKDIR /opt/chocolatey
RUN apk --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ add mono-dev \
  && apk add --no-cache curl \
  && apk add -t build-dependencies ca-certificates \
  && cert-sync /etc/ssl/certs/ca-certificates.crt \
  && ln -sf /opt /opt/chocolatey/opt \
  && mkdir -p /opt/chocolatey/lib \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*

ARG CHOCOLATEY_VERSION
RUN curl -sSL "https://github.com/chocolatey/choco/releases/download/${CHOCOLATEY_VERSION}/chocolatey.v${CHOCOLATEY_VERSION}.tar.gz" | tar xz

COPY entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
