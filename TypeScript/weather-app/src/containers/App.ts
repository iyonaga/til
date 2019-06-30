import { connect } from 'react-redux';

import App from '../components/App';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
    isLoading: !state.map.ready
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
