import { Suspense } from 'react';
import MaterialTabs from './Material';

function Loading() {
    return <center><h1>🌀 Loading...</h1></center>;
}

function Gene() {
    return (
            <div className="home">
                <br></br>
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Suspense fallback={<Loading />}><MaterialTabs /></Suspense>
                    </div>
                <div className="divider"></div></div>
            </div>
    );
}


export default Gene;