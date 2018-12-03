import { connect } from 'react-redux';
import { select } from '../../redux/ducks';

const mapStateToProps = (state: any) => ({
  users: select.users(state),
});

export default connect(mapStateToProps, null);
