// Resources
import '../../style/commons.scss';
import '../../style/reset.scss';
import './layout.scss';

// Libs
import Head from 'next/head';
import * as React from 'react';

interface Props {
    title: string;
    description: string;
}

class Layout extends React.PureComponent<Props, {}> {
    render() {
        const { title, children, description } = this.props;
        const someDescription = description || title;
        return (
            <div className="vtm-layout">
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="Description" content={someDescription} />
                </Head>
                {children}
            </div>
        );
    }
}

export default Layout;
