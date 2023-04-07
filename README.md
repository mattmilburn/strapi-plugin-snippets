<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo-2x.png" alt="Logo for Strapi snippets plugin" />
  <h1>Strapi Snippets</h1>
  <p>A plugin for Strapi CMS that populates custom snippets into API response data.</p>
  <img style="width: 960px; height: auto;" src="public/screenshot.png" alt="Screenshot for Strapi snippets plugin" />
</div>

## Get Started

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [User Guide](#user-guide)
* [Troubleshooting](#troubleshooting)
* [Support or Donate](#donate)
* [Roadmap](#roadmap)

## <a id="features"></a>✨ Features
* Create variables to use throughout your content, which are replaced in API response data.
* Copy and paste easily into your content fields.
* Updating the snippet `code` automatically updates all of your data entries in Strapi with the new `code`.
* Supports API models, plugin models, components, and dynamic zones.

## <a id="installation"></a>💎 Installation
```bash
yarn add strapi-plugin-snippets@latest
```

## <a id="configuration"></a>🔧 Configuration
| property | type (default) | description |
| - | - | - |
| contentTypes | object (`null`) | An optional config object that allows configuring which models should support snippets. |
| contentTypes.allow | array (`null`) | An array of either model, plugin, or component UIDs which support snippets. |
| contentTypes.deny | array (`null`) | An array of either model, plugin, or component UIDs which DO NOT support snippets. |
| ignoreUnmatched | bool (`false`) | If true, unmatched `codes` will remain unparsed in response data, otherwise they are replaced with an empty string. |
| uppercase | bool (`true`) | If true, the plugin will apply uppercase formatting to the `code` value when a snippet is created or updated. |

### `contentTypes`
By default, all API models and components are affected by the snippets plugin. Plugin models are not automatically included.

Use the `allow` and `deny` props of `contentTypes` to include or exclude certain UIDs which can include API content types, plugin content types, and components.

#### Example

```js
// ./config/plugins.js`
'use strict';

module.exports = {
  'snippets': {
    config: {
      contentTypes: {
        allow: [ 'plugin::menus.menu', 'plugin::menus.menu-item' ],
        deny: [ 'api::example.example', 'comp.example-component' ],
      },
    },
  },
};
```
| UID type | Format |
| - | - |
| API model | `api::name.name` |
| Plugin model | `plugin::name.name` |
| Component model | `category.name` |

### `ignoreUnmatched`
If true, unmatched `codes` will remain unparsed in response data, otherwise they are replaced with an empty string.

#### Example
Consider a scenario where we have 2 snippets, one called `SNIPPET_ONE` and another called `SNIPPET_TWO` and both will be replaced with the string "foobar". We also have an entity with a `title` and `summary` fields where both fields use snippets.

The snippet named `SNIPPET_MISSING` does not actually exist and will either be replaced with an empty string or ignored completely. See the example below.

```js
// ./config/plugins.js`
'use strict';

module.exports = {
  'snippets': {
    config: {
      ignoreUnmatched: false,
    },
  },
};
```


##### Response data BEFORE parsing snippets

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Testing snippet {SNIPPET_ONE} and {SNIPPET_MISSING}.",
      "summary": "Testing snippet {SNIPPET_ONE} and {SNIPPET_TWO}."
    }
  },
  "meta": {}
}
```

##### Response with `ignoreUnmatched` set to `true`

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Testing snippet foobar and {SNIPPET_MISSING}.",
      "summary": "Testing snippet foobar and foobar."
    }
  },
  "meta": {}
}
```

##### Response with `ignoreUnmatched` set to `false`

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Testing snippet foobar and .",
      "summary": "Testing snippet foobar and foobar."
    }
  },
  "meta": {}
}
```

### `uppercase`
If true, the plugin will apply uppercase formatting to the `code` value when a snippet is created or updated.

#### Example

```js
// ./config/plugins.js`
'use strict';

module.exports = {
  'snippets': {
    config: {
      uppercase: false,
    },
  },
};
```

## <a id="user-guide"></a>📘 User Guide

### TBD
<mark>@TODO</mark>

## <a id="troubleshooting"></a>💩 Troubleshooting

#### In general
Remember to **rebuild your app** after making changes to some config or other code.

```bash
yarn build
# OR
yarn develop
```

## <a id="donate"></a>❤️ Support or Donate
If you are enjoying this plugin and feel extra appreciative, you can [buy me a beer or 3 🍺🍺🍺](https://www.buymeacoffee.com/mattmilburn).

## <a id="roadmap"></a>🚧 Roadmap
* Edit view sidebar button to view and copy/paste snippet codes.
* Localization support
