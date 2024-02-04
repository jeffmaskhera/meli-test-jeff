import React  from 'react'
import Filter from "../../component/filter/filter";


const Home = () => {

    return (
        <div className="home">
            <Filter/>
        </div>
    );
};


Home.defaultProps = {
    items: {}
};

export default Home;

