ARG CHOCOLATEY_VERSION="1.1.0"

FROM mono:6.12 as builder
RUN apt-get update \
  && apt-get install -y \
    gzip \
    tar \
    wget \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV ChocolateyInstall="/opt/chocolatey"
ARG CHOCOLATEY_VERSION
WORKDIR /usr/local/src
RUN wget "https://github.com/chocolatey/choco/archive/${CHOCOLATEY_VERSION}.tar.gz" \
  && tar -xzf "${CHOCOLATEY_VERSION}.tar.gz" \
  && mv choco-${CHOCOLATEY_VERSION} choco

WORKDIR /usr/local/src/choco
RUN chmod +x build.sh zip.sh
RUN ./build.sh

FROM alpine:3.15
LABEL maintainer="CrazyMax"

COPY --from=builder /usr/local/src/choco/build_output/chocolatey /opt/chocolatey

RUN apk --update --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/edge/testing add mono-dev \
  && apk --update --no-cache add -t build-dependencies ca-certificates \
  && cert-sync /etc/ssl/certs/ca-certificates.crt \
  && ln -sf /opt /opt/chocolatey/opt \
  && mkdir -p /opt/chocolatey/lib \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*

COPY entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
