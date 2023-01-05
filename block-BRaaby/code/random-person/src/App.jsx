import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      activeInfo: {
        property: '',
        value: '',
      },
    };
  }
  componentDidMount() {
    fetch(`https://randomuser.me/api/`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data.results[0],
          activeInfo: {
            property: 'name',
            value: data.results[0].name.first + ' ' + data.results[0].name.last,
          },
        });
      });
  }
  updateUser = () => {
    this.setState({
      data: '',
    });
    fetch(`https://randomuser.me/api/`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data.results[0],
          activeInfo: {
            property: 'name',
            value: data.results[0].name.first + ' ' + data.results[0].name.last,
          },
        });
      });
  };
  handleActiveInfo = (e, data) => {
    let property = e.target.dataset.id;
    let value;
    switch (property) {
      case 'name':
        value = data.name.first + ' ' + data.name.last;
        break;
      case 'mailId':
        value = data.email;
        break;
      case 'age':
        value = data.dob.age;
        break;
      case 'address':
        value = data.location.city + ', ' + data.location.state;
        break;
      case 'contact':
        value = data.phone;
        break;
      case 'password':
        value = data.login.password;
        break;
    }
    this.setState({
      activeInfo: {
        property,
        value,
      },
    });
  };
  render() {
    let data = this.state.data;

    return (
      <div className="App">
        <img src={data ? data.picture.thumbnail : ''} />
        <div className="active-info">
          <div className="active-property">
            My {data ? this.state.activeInfo.property : ''} is
          </div>
          <div className="active-value">
            {data ? this.state.activeInfo.value : ''}
          </div>
        </div>
        <div className="icons">
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="name"
            className="fa fa-user"
          ></i>
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="mailId"
            className="fa fa-envelope"
          ></i>
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="age"
            className="fa fa-calendar"
          ></i>
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="address"
            className="fa fa-address-card"
          ></i>
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="contact"
            className="fa fa-phone"
          ></i>
          <i
            onClick={(e) => this.handleActiveInfo(e, data)}
            data-id="password"
            className="fa fa-lock"
          ></i>
        </div>
        <button onClick={this.updateUser}>
          {data ? 'Random User' : 'Loading...'}
        </button>
      </div>
    );
  }
}

export default App;
