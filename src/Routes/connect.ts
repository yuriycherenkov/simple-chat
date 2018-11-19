import { connect } from 'react-redux';

import { dispatch } from '../redux/actions';
import { select } from '../redux/selectors';

const mapState = (state: any) => ({
  users: select.users(state),
});

const mapDispatch = {
  getUsers: dispatch.getUsers,
};

export default connect(mapState, mapDispatch);
