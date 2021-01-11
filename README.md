# Bottin Block Plugin

This plugin provides Gutenberg block that you can use after loading the file.

## Installation

Clone this repo into the mu-plugins folder of your wordpress configuration.

```bash
git clone git@github.com:donovan-herion/wordpressmarche-bottin-block-plugin.git
```

Install all required packages by running the following command

```bash
npm install
```

call the plugin in the load.php file so that it runs on the wordpress site by default.

```bash
require_once WPMU_PLUGIN_DIR . '/bottin-block-plugin/blocks/bottin-block.php';
```

To modify the JS here is the command you need to run for compiling purposes

```bash
npx webpack --watch
```
