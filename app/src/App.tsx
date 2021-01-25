import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Todo from "./screens/TodoScreen";
import { ProvideAuth } from "./hooks/useAuth";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo" component={Todo} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
