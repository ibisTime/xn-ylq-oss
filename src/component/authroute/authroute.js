import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo } from '@redux/user';
import { isFullUser } from 'api/user';
import { getUserId } from 'common/js/util';

@withRouter
@connect(
  state => state.user,
  { setUserInfo }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    if (getUserId()) {
      isFullUser().then((data) => {
        this.props.setUserInfo(data);
        if (data.url) {
          this.props.history.replace(data.url);
        }
      }).catch(() => {});
    } else if (this.props.location.pathname !== '/register') {
      this.props.history.push('/login');
    }
  }
  render() {
    return null;
  }
}

export default AuthRoute;
