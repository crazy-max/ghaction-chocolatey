# syntax=docker/dockerfile:1

ARG CHOCOLATEY_VERSION="2.2.2"
ARG ALPINE_VERSION="3.17"

FROM alpine:${ALPINE_VERSION}
RUN apk --update --repository https://dl-cdn.alpinelinux.org/alpine/edge/testing add mono-dev \
  && apk add --no-cache curl \
  && apk add -t build-dependencies ca-certificates \
  && cert-sync /etc/ssl/certs/ca-certificates.crt \
  && ln -sf /opt /opt/chocolatey/opt \
  && mkdir -p /opt/chocolatey/lib \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*

ARG CHOCOLATEY_VERSION
WORKDIR /opt/chocolatey
RUN curl -sSL "https://github.com/chocolatey/choco/releases/download/${CHOCOLATEY_VERSION}/chocolatey.v${CHOCOLATEY_VERSION}.tar.gz" | tar xz

COPY entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
