# syntax=docker/dockerfile:1

ARG CHOCOLATEY_VERSION="2.1.0"
ARG MONO_VERSION="6.12"
ARG ALPINE_VERSION="3.17"

FROM --platform=$BUILDPLATFORM alpine:${ALPINE_VERSION} as src
RUN apk add --no-cache git patch
WORKDIR /src
ARG CHOCOLATEY_VERSION
RUN git clone --branch ${CHOCOLATEY_VERSION} "https://github.com/chocolatey/choco.git" .
COPY GitVersion.patch .
RUN patch -u GitVersion.yml -i GitVersion.patch

FROM mono:${MONO_VERSION} as builder
ARG DEBIAN_FRONTEND=noninteractive

RUN curl -o packages-microsoft-prod.deb https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb \
  && dpkg -i packages-microsoft-prod.deb \
  && apt-get update \
  && apt-get install -y dotnet-sdk-6.0

RUN echo deb http://deb.debian.org/debian buster-backports main | tee /etc/apt/sources.list.d/buster-backports.list \
  && apt-get update \
  && apt-get install -y -t buster-backports git

ENV ChocolateyInstall="/opt/chocolatey"
COPY --from=src /src /usr/local/src/choco
WORKDIR /usr/local/src/choco
RUN ./build.sh --verbosity=diagnostic

FROM alpine:${ALPINE_VERSION}
COPY --from=builder /usr/local/src/choco/code_drop/temp/_PublishedApps/choco /opt/chocolatey
RUN apk --update --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/edge/testing add mono-dev \
  && apk --update --no-cache add -t build-dependencies ca-certificates \
  && cert-sync /etc/ssl/certs/ca-certificates.crt \
  && ln -sf /opt /opt/chocolatey/opt \
  && mkdir -p /opt/chocolatey/lib \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*
COPY entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
