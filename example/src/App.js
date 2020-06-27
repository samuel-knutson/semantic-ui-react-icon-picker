import React, { useState } from 'react';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';
import { IconDropdown, IconPickerModal } from 'semantic-ui-react-icon-picker';
import 'semantic-ui-react-icon-picker/dist/index.css';

const App = () => {
  const [dropdownValue, setDropdownValue] = useState();
  const [modalValue, setModalValue] = useState();

  return (
    <Container>
      <div style={{ marginTop: '20px' }}>
        <Segment>
          <Header content='Icon Dropdown Demo' />
          <IconDropdown value={dropdownValue} onChange={setDropdownValue} />
          <div style={{ marginTop: '20px' }}>
            <Header sub content='Current Value' />
            {dropdownValue && (
              <div>
                <Icon name={dropdownValue} size='massive' />
                <div>{dropdownValue}</div>
              </div>
            )}
          </div>
        </Segment>

        <Segment>
          <Header content='Icon Picker Modal Demo' />
          <IconPickerModal value={modalValue} onChange={setModalValue} />
        </Segment>
      </div>
    </Container>
  );
};

export default App;
