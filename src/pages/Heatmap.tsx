import React, { useState } from "react";
import Plot from "react-plotly.js";
import * as Plotly from "plotly.js"; // ✅ Full Plotly library with typings
import geneExpressionDataRaw from "../data/WT_DEG.json";

// Type for gene expression entries
interface GeneExpressionData {
  SYMBOL: string;
  DESCRIPTION: string;
  [key: string]: string | number;
}

// Colors for each timepoint group
const timepointColors: Record<string, string> = {
  "0_hr": "#FFCCCC",
  "6_hr": "#FFE5B4",
  "24_hr": "#FFFFB3",
  "48_hr": "#CCFFCC",
  "72_hr": "#CCE5FF",
  "120_hr": "#E0CCFF",
};

// Extracts "0_hr" from "0_hr_1"
const getTimeGroup = (label: string) => {
  const match = label.match(/^\d+_hr/);
  return match ? match[0] : "other";
};

const geneExpressionData: GeneExpressionData[] = geneExpressionDataRaw as GeneExpressionData[];

const Heatmap: React.FC = () => {
  const [selectedGenes, setSelectedGenes] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<GeneExpressionData[]>([]);

  if (!geneExpressionData || geneExpressionData.length === 0) {
    return <p>Loading data...</p>;
  }

  // Extract time point columns like "0_hr_1", "24_hr_2", etc.
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
    timePoints.map((time) => Number(gene[time]) || 0)
  );

  // Group assignment for each time point
  const timeGroups = Array.from(new Set(timePoints.map((tp) => getTimeGroup(tp))));
  const groupToIndex = Object.fromEntries(timeGroups.map((g, i) => [g, i]));

  const colorRowZ = [timePoints.map((tp) => groupToIndex[getTimeGroup(tp)])];

  // ✅ Type-safe colorscale
  const groupColorscale: Plotly.ColorScale = timeGroups.map((group, i): [number, string] => [
  i / (timeGroups.length - 1),
  timepointColors[group] || "#CCCCCC",
  ]);

  const timeColorTrace: Partial<Plotly.PlotData> = {
    z: colorRowZ,
    x: timePoints,
    y: ["Time Group"],
    type: "heatmap",
    colorscale: groupColorscale,
    showscale: false,
    hoverinfo: "x+text",
    text: timePoints.map((tp) => getTimeGroup(tp)),
    zmin: 0,
    zmax: timeGroups.length - 1,
    xaxis: "x",
    yaxis: "y2",
  };

  const geneHeatmapTrace: Partial<Plotly.PlotData> = {
    z: expressionValues,
    x: timePoints,
    y: geneNames,
    type: "heatmap",
    colorscale: "Warm",
    showscale: true,
    colorbar: {
      title: "Expression (FPKM)",
      titleside: "right",
    },
    xaxis: "x",
    yaxis: "y",
  };

  return (
    <div>
      <h2>Gene Expression Heatmap</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Enter up to 10 gene symbols separated by commas"
          style={{ width: "400px", padding: "8px" }}
        />
        <button
          onClick={handleGenerateHeatmap}
          style={{ marginLeft: "10px", padding: "8px 12px" }}
        >
          Generate Heatmap
        </button>
      </div>

      {filteredData.length > 0 ? (
        <>
          <Plot
            data={[
              timeColorTrace as Partial<Plotly.PlotData>,
              geneHeatmapTrace as Partial<Plotly.PlotData>,
            ]}
            layout={{
              title: "Gene Expression Heatmap",
              xaxis: {
                title: "Time Points",
                tickangle: -90,
              },
              yaxis: {
                domain: [0, 0.9],
                title: "Genes",
              },
              yaxis2: {
                domain: [0.91, 1],
                showticklabels: false,
                ticks: "",
                showgrid: false,
              },
              autosize: true,
              margin: { t: 50, l: 100, r: 50, b: 150 },
              height: 600,
              width: 1400,
            }}
            config={{
              toImageButtonOptions: {
                format: "png",
                filename: searchInput + "_heatmap",
                height: 600,
                width: 1400,
                scale: 1,
              },
            }}
          />

          {/* Optional timepoint legend */}
          <div style={{ marginTop: "10px" }}>
            {Object.entries(timepointColors).map(([group, color]) => (
              <div key={group} style={{ display: "inline-block", marginRight: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    backgroundColor: color,
                    marginRight: "5px",
                    border: "1px solid #888",
                  }}
                ></span>
                {group}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>
          Enter up to 10 gene symbols separated by commas and press{" "}
          <strong>"Generate Heatmap"</strong>.
        </p>
      )}
    </div>
  );
};

export default Heatmap;