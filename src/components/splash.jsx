import React from 'react';
import { Page, App } from 'framework7-react';

const Splash = () => {

    return (
        <>
        setTimeout(() =>{<App name="Horses"></App>}, 3000)
        <Page>
            <p>Splashscreen</p>
        </Page>
        </>
    )

}

export default Splash;