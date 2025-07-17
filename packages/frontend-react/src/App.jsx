import DisqusSSO from './components/DisqusSSO';

function App() {
  return (
    <div className="App">
        <h1>Disqus SSO Demo - React</h1>
        <a href="https://github.com/disqus/sso-demo/tree/main/packages/frontend-react" target="_blank" rel="noopener noreferrer">View Frontend Source Code on GitHub</a>

        <a href="https://github.com/disqus/sso-demo/tree/main/packages/backend" target="_blank" rel="noopener noreferrer">View Backend Source Code on GitHub</a>
        <DisqusSSO />
    </div>
  );
}

export default App;
