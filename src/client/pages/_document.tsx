// Libs
import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-blue.min.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
            </html>
        );
    }
}
