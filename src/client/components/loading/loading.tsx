import './loading.scss';

// Libs
import React, { memo } from 'react';

function Loading() {
    return <h2 className="vtm-loading">Loading...</h2>;
}

Loading.propTypes = {};
Loading.defaultProps = {};

export default memo(Loading);
