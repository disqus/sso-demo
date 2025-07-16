import React, { useState, useEffect } from 'react';
import DisqusSSO from './components/DisqusSSO';
import { DisussionEmbed } from 'disqus-react';

function App() {
  return (
    <div className="App">
      <h1>Disqus SSO Demo - React</h1>
      <DisqusSSO />
    </div>
  );
}

export default App;
