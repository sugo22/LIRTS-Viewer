import Plot from "react-plotly.js";
import './Graphs.css'
/*The long list of variables here are what this component needs to function. They represent the various 
parts of the gene information. It's stored in the stat above so other components like the BoxPlot can also
use them. It's of the format {list of variable names}: {Varname: type}.
These variables are passed in as arguments when this is called in app.tsx*/
export function Scatterplot({dataMap, geneName, geneDescription, xPoints}:
  {dataMap: Plotly.PlotData[];
  geneName: string;
  geneDescription: string;
  xPoints: Number[]
  }): JSX.Element {
    return (
      <div className="graph-container">
        <Plot
          data= {dataMap}
          layout={ {width: 1200, height: 600, title: { text: geneName, font: {size: 28, color:'black'}}, margin: { t: 100, b: 100}, 
            xaxis: {
              title: {
                text: "Hour",
                font: {
                  size: 24,
                  color: 'black'
                }
              },
              tickvals: xPoints, // Assumes all traces have the same x values
              tickfont: {
                size: 20,
                color: 'black'
              },
              ticks: 'outside',
              tickmode: 'array',
              tickangle: 0,
              automargin: true
            }, 
            yaxis: {
              title: {
                text: "FPKM",
                font: {
                  size: 24,
                  color: 'black'
                },
              },
              rangemode: 'tozero',
              tickfont: {
                size: 20,
                color: 'black'
              },
            },
            legend: {
            font: {
              size: 14,      // ← Change this to your preferred font size
              color: 'black' // ← Optional: Customize color
              }
            },
            annotations: [
              {
                text: geneDescription,
                showarrow: false,
                xref: "paper",
                yref: "paper",
                x: 0.5,
                y: 1.1,
                font: {
                  size: 14,
                  color: "#262927"
                },
                xanchor: "center"
              }            
            ],
          }}
          config = {{
            toImageButtonOptions: {
              format: 'svg', // one of png, svg, jpeg, webp
              filename: geneName+'_scatterplot_image',
              height: 500,
              width: 1000,
              scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
            },
            displayModeBar: true,
            modeBarButtonsToRemove: ['zoom2d','pan2d', 'select2d', 'lasso2d']
          }
          }
        />
      </div>
    );
}
