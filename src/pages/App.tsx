import './Divider.css'
import { Suspense, lazy } from 'react';

const WTGraph = lazy(() => import("./WTGraph"));

function Loading() {
    return <center><h1>🌀 Loading...</h1></center>;
}


const VerticalDivider = () => {
    
    return (
        <div className="vertical-divider">
            <div className="left-component">
                <h2>Instructions</h2>
            <p>Please use the dropdown box, located beside the update button to switch among Boxplot, Scatterplot and a combination of 
            Box&Scatter plot options.</p>
            <p>To scale the X or Y axis, please click and drag <strong>above or below</strong> for the Y axis
            and to the <strong>left or right</strong> for the X axis. If you click directly on either axis,
            you will scroll through the graph and the axes will not be scaled. Use the autoscale button in
            the top right corner of the graph to reset the graph after scaling.</p>
            <p>Use the camera button on the top right corner of the graph to download an image of it. It will prompt a download window and this
            image will save in the svg format.</p>
            <p>After you search for a gene, a table containing the FPKM values at each time point is available to see. Please scroll down to see it.</p>
            </div>
            <div className="divider"></div>
                <div className="right-component">
                    <br></br>
                    <Suspense fallback={<Loading />}><WTGraph/></Suspense>
                <div>
                </div>
                
            </div>
        </div>
    );
};

export default VerticalDivider;