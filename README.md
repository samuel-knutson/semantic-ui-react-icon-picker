# semantic-ui-react-icon-picker

> Icon picker component for use with semantic-ui-react

[![NPM](https://img.shields.io/npm/v/semantic-ui-react-icon-picker.svg)](https://www.npmjs.com/package/semantic-ui-react-icon-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save semantic-ui-react-icon-picker
```

## Usage

```jsx
import React, { useState } from 'react';
import { IconPicker } from 'semantic-ui-react-icon-picker';
import 'semantic-ui-react-icon-picker/dist/index.css';

const Example = () => {
  const [icon, setIcon] = useState();
  return <IconPicker value={icon} onChange={setIcon} />;
};
```

## License

MIT © [Sam Knutson](https://github.com/samuel-knutson)
