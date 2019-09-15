[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-chocolatey.svg?style=flat-square)](https://github.com/crazy-max/ghaction-chocolatey/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-chocolatey-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/chocolatey)
[![Test workflow](https://github.com/crazy-max/ghaction-chocolatey/workflows/test/badge.svg)](https://github.com/crazy-max/ghaction-chocolatey/actions)
[![Support me on Patreon](https://img.shields.io/badge/donate-patreon-f96854.svg?logo=patreon&style=flat-square)](https://www.patreon.com/crazymax) 
[![Paypal Donate](https://img.shields.io/badge/donate-paypal-00457c.svg?logo=paypal&style=flat-square)](https://www.paypal.me/crazyws)

## ✨ About

GitHub Action to use as a wrapper for the [Chocolatey](https://chocolatey.org/) CLI to build and publish packages.

> **:warning: Note:** To use this action, you must have access to the [GitHub Actions](https://github.com/features/actions) feature. GitHub Actions are currently only available in public beta. You can [apply for the GitHub Actions beta here](https://github.com/features/actions/signup/).

## 🚀 Usage

```yaml
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@master
      -
        name: Choco help
        uses: crazy-max/ghaction-chocolatey@master
        with:
          args: -h
```

Docker :whale: image is also provided and automatically updated within [Docker Hub](https://hub.docker.com/r/crazymax/ghaction-chocolatey/tags) so you can directly use the following [Docker Hub action](https://help.github.com/en/articles/workflow-syntax-for-github-actions#example-using-a-docker-hub-action):

```yaml
- name: Deploy
  if: success()
  uses: docker://crazymax/ghaction-chocolatey
  env:
    INPUT_ARGS: -h
```

## 💅 Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name            | Type    | Description                           |
|-----------------|---------|---------------------------------------|
| `args`          | String  | Arguments to pass to Chocolatey CLI   |

## 🤝 How can I help ?

All kinds of contributions are welcome :raised_hands:!<br />
The most basic way to show your support is to star :star2: the project, or to raise issues :speech_balloon:<br />
But we're not gonna lie to each other, I'd rather you buy me a beer or two :beers:!

[![Support me on Patreon](.res/patreon.png)](https://www.patreon.com/crazymax) 
[![Paypal Donate](.res/paypal.png)](https://www.paypal.me/crazyws)

## 📝 License

MIT. See `LICENSE` for more details.
