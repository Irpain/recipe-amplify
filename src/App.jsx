import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import RecipeList from './components/RecipeList.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Collaborative Recipe Sharing Platform</h2>
        <AmplifySignOut />
      </header>
      <RecipeList />
    </div>
  );
}

export default withAuthenticator(App);