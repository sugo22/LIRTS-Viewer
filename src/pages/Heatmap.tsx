import React, { useState } from "react";
import Plot from "react-plotly.js";
import geneExpressionDataRaw from "../data/WT_DEG.json";

interface GeneExpressionData {
  SYMBOL: string;
  DESCRIPTION: string;
  [key: string]: string | number;
}

const geneExpressionData: GeneExpressionData[] = geneExpressionDataRaw as GeneExpressionData[];

const Heatmap: React.FC = () => {
  const [selectedGenes, setSelectedGenes] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<GeneExpressionData[]>([]);

  if (!geneExpressionData || geneExpressionData.length === 0) {
    return <p>Loading data...</p>;
  }

  // Extract all time-related keys (e.g., "0_hr_1", "6_hr_1", etc.)
  const timePoints = Object.keys(geneExpressionData[0])
    .filter((key) => key.match(/^\d+_hr_\d+$/))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genes = event.target.value
      .toUpperCase()
      .split(",")
      .map((gene) => gene.trim())
      .filter((gene) => gene.length > 0)
      .slice(0, 10);
    setSearchInput(event.target.value);
    setSelectedGenes(genes);
  };

  const handleGenerateHeatmap = () => {
    const filtered = geneExpressionData.filter((gene) =>
      selectedGenes.includes(gene.SYMBOL.toUpperCase())
    );
    setFilteredData(filtered);
  };

  const geneNames = filteredData.map((gene) => gene.SYMBOL);
  const expressionValues = filteredData.map((gene) =>
    timePoints.map((time) => Number(gene[time]) || 0) // Use all available time points
  );

  return (
    <div>
      <h2>Gene Expression Heatmap</h2>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Enter up to 10 gene symbols (comma-separated)"
        />
        <button onClick={handleGenerateHeatmap}>Generate Heatmap</button>
      </div>

      {filteredData.length > 0 ? (
        <Plot
          data={[
            {
              z: expressionValues,
              x: timePoints,
              y: geneNames,
              type: "heatmap",
              colorscale: "Warm",
              showscale: true,
            },
          ]}
          layout={{
            title: "Gene Expression Heatmap",
            xaxis: { title: "Time Points", tickangle: -90, tickmode: "linear", dtick: 1 },
            yaxis: { title: "Genes" },
            autosize: true,
            margin: { t: 50, l: 100, r: 50, b: 150 },
            height: 600,
            width: 1400,
          }}
          config = {{
            toImageButtonOptions: {
              format: 'png', // one of png, svg, jpeg, webp
              filename: searchInput+'_heatmap',
              height: 600,
              width: 1400,
              scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
            },
          }
          }
        />
      ) : (
        <p>Enter gene symbols and press "Generate Heatmap".</p>
      )}
    </div>
  );
};

export default Heatmap;