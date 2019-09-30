[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-chocolatey.svg?style=flat-square)](https://github.com/crazy-max/ghaction-chocolatey/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-chocolatey--cli-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/chocolatey-cli)
[![Test workflow](https://github.com/crazy-max/ghaction-chocolatey/workflows/test/badge.svg)](https://github.com/crazy-max/ghaction-chocolatey/actions)
[![Support me on Patreon](https://img.shields.io/badge/donate-patreon-f96854.svg?logo=patreon&style=flat-square)](https://www.patreon.com/crazymax) 
[![Paypal Donate](https://img.shields.io/badge/donate-paypal-00457c.svg?logo=paypal&style=flat-square)](https://www.paypal.me/crazyws)

## ✨ About

GitHub Action as a wrapper for the [Chocolatey](https://chocolatey.org/) CLI to build and publish packages. This will allow you to use Chocolatey on all [supported virtual environments](https://help.github.com/en/articles/virtual-environments-for-github-actions#supported-virtual-environments-and-hardware-resources) available.

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
