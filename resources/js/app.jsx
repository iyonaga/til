import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';

var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <div className="hello-message">
          Hello {this.props.name}
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <HelloMessage name="John"/>,
  document.getElementById('hello')
);

function formatName(user) {
  return `${user.firstName} ${user.lastName}`;
}

const user = {
  firstName: 'yusuke',
  lastName: 'iyonaga'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);



ReactDOM.render(
  element,
  document.getElementById('hello-user')
)


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('tick')
)


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('toggle-button')
)


function UserGreeting(props) {
  return <h1>Welcome back</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />
  } else {
    return <GuestGreeting />
  }
}

ReactDOM.render(
  <Greeting isLoggedIn={false }/>,
  document.getElementById('greeting')
)



function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    });
  }

  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('login-control')
)
