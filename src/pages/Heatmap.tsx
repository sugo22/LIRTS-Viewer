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
  title: {
    text: "Expression values (FPKM)",
    side: "right",
    font: {
      size: 16,
      color: "black",
    },
  },
  tickfont: {
    size: 14,       // ⬅️ Change font size of tick labels
    color: "black", // ⬅️ Optional: change tick label color
  },
} as any, // 👈 necessary override to avoid TS error
  xaxis: "x",
  yaxis: "y",
};

  const groupToCenteredX: { [group: string]: string } = {};

  timeGroups.forEach((group) => {
    const matching = timePoints.filter((tp) => getTimeGroup(tp) === group);
    const centerIndex = Math.floor(matching.length / 2);
    groupToCenteredX[group] = matching[centerIndex]; // center timepoint
  });
  return (
    <div>
      <h4>Gene Expression Heatmap</h4>
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
            title: {
              text:`Heatmap for ${geneNames.join(", ")}`,
              font:{size: 24}},
            xaxis: {
              title: {
                text: "Time Points",
                font: {
                  size: 18, // ✅ Correct placement
                },
                standoff:20,
              },
              tickangle: -90,
              tickfont: {
                size: 14,
              },
            },
            yaxis: {
              domain: [0, 0.9],
              title: {
                text: "Genes",
                font: {
                  size: 18, // ✅ Correct placement
                },
                standoff:20,
              },
              tickfont: {
                size: 16,
              },
            },
            yaxis2: {
              domain: [0.91, 1],
              showticklabels: false,
              ticks: "",
              showgrid: false,
            },
            autosize: true,
            margin: { t: 100, l: 100, r: 50, b: 150 },
            height: 600,
            width: 1400,
            annotations: timeGroups.map((group) => ({
              x: groupToCenteredX[group],
              y: 1,
              xref: "x",
              yref: "paper",
              text: `<span style="background-color:${timepointColors[group]};padding:2px 6px;border:1px solid #444;border-radius:3px;color:black">${group}</span>`,
              showarrow: false,
              align: "center",
              font: {
                size: 14,
                color: "black",},
              })),
            }}
            config={{
              toImageButtonOptions: {
                format: "png",
                filename: searchInput + "_heatmap",
                height: 600,
                width: 1400,
                scale: 1,
              },
              displayModeBar: true,
              modeBarButtonsToRemove: ['zoom2d','zoomIn2d','zoomOut2d','pan2d', 'select2d', 'lasso2d', 'autoScale2d']
            }}
          />
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