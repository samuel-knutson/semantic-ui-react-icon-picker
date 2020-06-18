import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { icons } from './icons';
import styles from './styles.module.css';

const IconPicker = ({ value, onChange }) => (
  <div className={styles['icon-picker']}>
    <Dropdown
      placeholder='Select an icon...'
      fluid
      selection
      search
      clearable
      selectOnBlur={false}
      value={value}
      options={icons.map((icon) => ({
        key: icon,
        text: icon,
        value: icon,
        icon: icon,
        className: styles['icon-picker-item']
      }))}
      onChange={(e, { value }) => onChange(value)}
    />
  </div>
);

export default IconPicker;
