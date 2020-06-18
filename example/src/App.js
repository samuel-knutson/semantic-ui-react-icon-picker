import React, { useState } from 'react';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';
import { IconPicker } from 'semantic-ui-react-icon-picker';
import 'semantic-ui-react-icon-picker/dist/index.css';

const App = () => {
  const [icon, setIcon] = useState();
  return (
    <Container>
      <div style={{ marginTop: '20px' }}>
        <Segment>
          <Header content='Icon Picker Demo' />
          <IconPicker value={icon} onChange={setIcon} />
          <div style={{ marginTop: '20px' }}>
            <Header sub content='Current Value' />
            {icon && (
              <div>
                <Icon name={icon} size='massive' />
                <div>{icon}</div>
              </div>
            )}
          </div>
        </Segment>
      </div>
    </Container>
  );
};

export default App;
