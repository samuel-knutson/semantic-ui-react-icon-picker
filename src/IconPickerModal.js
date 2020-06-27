import React, { useState } from 'react';
import { Modal, Button, Grid, Popup, Input } from 'semantic-ui-react';
import { icons } from './icons';

const IconPickerModal = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <Modal
      trigger={
        <Button
          icon={value || undefined}
          content={value ? undefined : 'Select Icon'}
          onClick={() => setOpen(true)}
        />
      }
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>Select an Icon</Modal.Header>
      <Modal.Content scrolling>
        <Grid columns={8}>
          {icons
            .filter((icon) => icon.match(query))
            .map((icon) => (
              <Grid.Column key={icon}>
                <Popup
                  content={icon}
                  trigger={
                    <Button
                      icon={icon}
                      onClick={() => {
                        onChange(icon);
                        setOpen(false);
                      }}
                    />
                  }
                />
              </Grid.Column>
            ))}
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Input
          icon='search'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ float: 'left' }}
        />
        <Button content='Cancel' onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
};

export default IconPickerModal;
