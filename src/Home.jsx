import React from 'react';
import './App.css';

function Home() {
    return (
        <div>
            <h1>Kitchen Inventory Manager</h1>
            <div>
                <h2>Welcome to Kitchen Inventory Manager App!</h2>
            </div>
            <div className="text">
                <span>Click on Zone to add/remove storage zones.</span><br/>
                <span>Click on Register to add food items.</span><br/>
            </div>
        </div>
    );
}

export default Home;
