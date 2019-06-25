// Resources
import './articles-page.scss';

// Libs
import React from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {get} from 'lodash/object';
import { initDefaultPropsFromContext } from '../../state/utils/context-utils';

// Component
import Layout from '../../../client/components/layout/layout';
import Loading from '../../components/loading/loading';

// Ducks
// import {articleOperation, articleSelectors, articleActions} from '../../state/ducks/article';
// import {authorSelectors, authorActions} from '../../state/ducks/author';

interface Props {
    // requestSearch: () => void;
    // isRequestingArticles: boolean;
    // tracks: [];
}

interface State {}

class HomePage extends React.PureComponent<Props, State> {
    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    render() {
        return (
            <Layout title="Virtual mind" description="Some description useful for SEO">
                SOME CONTENT HERE
                <Loading />
            </Layout>
        );
    }
}

/*
const mapDispatchToProps = dispatch => {
    return {
        requestSearch: bindActionCreators(articleOperation.requestSearch, dispatch)
    };
};

const mapStateToProps = state => {
    return {
        isRequestingArticles: articleSelectors.isRequesting(state)
    };
};
*/
export default connect()(HomePage);
// mapStateToProps,
// mapDispatchToProps,
