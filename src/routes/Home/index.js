// import React from 'react';
// import Loadable from 'react-loadable';

// const HomePage = Loadable({
//     loader: () => import("./Home"),
//     // loader: () => import("./Welcome"),
//     loading: () => <div>loading...</div>,
//     modules: ['home']
// });
// export default () => (
//     <div>
//         <HomePage />
//     </div>
// );

import React from 'react';
import Page from '../../components/Page';


const Home = () => (
    <Page  title="Home"
           description="Welcome to our beautiful homepage"
           id="home"
           className="home-page">
        Home page
        Yahooo
    </Page>
);

export default Home