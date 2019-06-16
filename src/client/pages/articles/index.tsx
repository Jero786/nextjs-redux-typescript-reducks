// Resources
import './articles-page.scss';

// Libs
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash/object';
import { initDefaultPropsFromContext } from '../../state/utils/context-utils';

// Component
import Layout from '../../../client/components/layout/layout';
import Card from '../../components/card/card';
import Loading from '../../components/loading/loading';

// Ducks
import { articleOperation, articleSelectors, articleActions } from '../../state/ducks/article';
import { authorSelectors, authorActions } from '../../state/ducks/author';

interface Props {
    requestSearch: () => void;
    requestAuthors: () => void;
    newArticleShown: () => void;
    requestDeleteArticle: (string) => void;
    requestNewArticle: (object) => void;
    requestChangeArticle: (object) => void;
    isRequestingArticles: boolean;
    isRequestingAuthors: boolean;
    tracks: [];
    articles: [];
    authors: [];
}

interface State {
    valueSearch: string;
}

class HomePage extends React.PureComponent<Props, State> {
    state = {
        valueSearch: '',
    };

    componentDidMount() {
        const { requestSearch, requestAuthors } = this.props;
        requestSearch();
        requestAuthors();
    }

    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    ['handleOnSearch'] = evt => {
        evt.preventDefault();
        const { requestSearch } = this.props;

        requestSearch();
    };

    render() {
        const { valueSearch } = this.state;
        const {
            isRequestingArticles,
            isRequestingAuthors,
            articles,
            authors,
            newArticleShown,
            requestNewArticle,
            requestChangeArticle,
            requestDeleteArticle
        } = this.props;

        let catalogsEl;
        let loadingEl;
        let emptyMessageEl;

        if (isRequestingArticles || isRequestingAuthors) {
            loadingEl = <Loading />;
        }

        if (!isRequestingArticles && articles) {
            catalogsEl = articles.map((article, index )=> {
                return (
                    <Card
                        key={`article-id-${get(article, '_id') || index}`}
                        title={get(article, 'title', '')}
                        shortDescription={get(article, 'short_description', '')}
                        longDescription={get(article, 'long_description', '')}
                        avatars={authors}
                        itemId={get(article, '_id')}
                        selectedAvatarsId={get(article, 'authors', [])}
                        onClickSave={payload => {
                            if (payload && payload._id) {
                                requestChangeArticle(payload);
                            } else {
                                requestNewArticle(payload);
                            }
                        }}
                        onClickDelete={() => requestDeleteArticle(get(article, '_id'))}
                    />
                );
            });
        }

        if (!isRequestingArticles && (!articles || articles.length === 0)) {
            emptyMessageEl = <h2 className="vtm-article-page__title">Search or create your articles!</h2>;
        }

        return (
            <Layout title="Virtual mind" description="Some description useful for SEO">
                <div className="vtm-article-page">
                    <div className="vtm-article-page__header">
                        <form action="" onSubmit={this.handleOnSearch}>
                            <div className="vtm-article-page__header-search mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <label
                                    htmlFor="input-2"
                                    className="vtm-article-page__header-search-label mdl-textfield__label"
                                >
                                    Search
                                </label>

                                <input
                                    className="mdl-textfield__input"
                                    defaultValue={valueSearch}
                                    id="input-2"
                                    type="text"
                                    onChange={evt => this.setState({ valueSearch: evt.target.value })}
                                />

                                <i
                                    role="button"
                                    onClick={this.handleOnSearch}
                                    tabIndex={0}
                                    onKeyPress={() => {}}
                                    className="vtm-article-page__header-search-icon material-icons"
                                >
                                    search
                                </i>
                            </div>
                        </form>
                    </div>
                    <div className="vtm-article-page__body">
                        <div className={`vtm-article-page__body-catalogs ${isRequestingArticles ? ' is-loading' : ''}`}>
                            {catalogsEl}
                            {loadingEl}
                            {emptyMessageEl}
                        </div>

                        <button
                            onClick={newArticleShown}
                            className="vtm-add-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                        >
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestSearch: bindActionCreators(articleOperation.requestSearch, dispatch),
        requestAuthors: bindActionCreators(authorActions.requestSearch, dispatch),
        newArticleShown: bindActionCreators(articleActions.newArticleShown, dispatch),
        requestNewArticle: bindActionCreators(articleActions.requestNewArticle, dispatch),
        requestChangeArticle: bindActionCreators(articleActions.requestChangeArticle, dispatch),
        requestDeleteArticle: bindActionCreators(articleActions.requestDeleteArticle, dispatch),
    };
};

const mapStateToProps = state => {
    return {
        isRequestingArticles: articleSelectors.isRequesting(state),
        isRequestingAuthors: authorSelectors.isRequesting(state),
        articles: articleSelectors.getArticles(state),
        authors: authorSelectors.getAuthors(state),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage);
