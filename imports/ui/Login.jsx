import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login, password } = this.state;
    Meteor.loginWithPassword(login, password, (err, res) => {
      if (err) {
        Bert.alert({
          title: 'Ошибка входа!',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-user',
        });
      } else {
        Bert.alert({
          title: 'Успешно вошли!',
          message: 'Вход выполнен успешно!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user',
        });
      }
    });
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              MM Dent Войдите в систему
            </Header>
            <Form size="large" onSubmit={e => this.handleSubmit(e)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  value={this.state.login}
                  onChange={e => this.setState({ login: e.target.value })}
                  placeholder="Логин"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  iconPosition="left"
                  placeholder="Пароль"
                  type="password"
                />
                <Button
                  type="submit"
                  role="submit"
                  color="teal"
                  fluid
                  size="large"
                >
                  Войти
                </Button>
              </Segment>
            </Form>
            <Message>
              По вопросам регистрации пишите
              <a href="mailto:amanbayev@gmail.com"> сюда</a>.
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
