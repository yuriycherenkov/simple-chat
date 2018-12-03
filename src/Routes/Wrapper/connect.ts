import { connect } from 'react-redux';
import { dispatch } from '../../redux/ducks';

const mapDispatch = {
  setUsers: dispatch.setUsers,
};

export default connect(null, mapDispatch);
