// components/Loading.js

import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full border-t-4 border-white border-opacity-25 h-12 w-12"></div>
        </div>
    );
};

export default Loading;
