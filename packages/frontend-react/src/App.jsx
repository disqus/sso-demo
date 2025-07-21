import DisqusSSO from './components/DisqusSSO';

function App() {
  return (
    <div className="App">
        <h1>Disqus SSO Demo - React</h1>
        <div>
            <a href="https://github.com/disqus/sso-demo/tree/main/packages/frontend-react" target="_blank" rel="noopener noreferrer">View Frontend Source Code on GitHub</a>
        </div>
        <div>
            <a href="https://github.com/disqus/sso-demo/tree/main/packages/backend" target="_blank" rel="noopener noreferrer">View Backend Source Code on GitHub</a>
        </div>
        <div>
        <a href='https://disqus.github.io/sso-demo/'>Back to Demo Home</a>
        </div>
        <DisqusSSO />
    </div>
  );
}

export default App;
