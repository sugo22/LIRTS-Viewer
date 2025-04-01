import "./table.css";
import React, { useState } from "react";
import Plot from "react-plotly.js";
import jsonData from "../data/keggpathwaygenes_data.json";

type PathwayData = {
  pathwayID?: string[];
  pathway: string[];
  genes: string[];
};

type TimePoint = keyof typeof jsonData;

const PathwayApp: React.FC = () => {
  const timePoints = Object.keys(jsonData) as TimePoint[];
  const [selectedTimePoint, setSelectedTimePoint] = useState<TimePoint>(timePoints[0]);

  const data: PathwayData[] = jsonData[selectedTimePoint] || [];

  const pathwayIDs = data.map((item) =>
    Array.isArray(item.pathwayID) ? item.pathwayID.join("; ") : "N/A"
  );
  const pathways = data.map((item) =>
    Array.isArray(item.pathway) ? item.pathway[0] : "N/A"
  );
  const genes = data.map((item) =>
    Array.isArray(item.genes) ? item.genes.join(", ") : "N/A"
  );

  const tableData = {
    type: "table" as const,
    header: {
      values: ["pathway ID", "Pathway", "Genes"],
      align: "center",
      fill: { color: "lightgrey" },
      font: { color: "black", size: 14 },
    },
    cells: {
      values: [pathwayIDs, pathways, genes],
      align: "center",
      columnwidth: [150, 200, 800],
      font: { color: "black", size: 12 },
    },
  };

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,pathwayID,Pathway,Genes\n";
    data.forEach((item) => {
      const pathwayID = Array.isArray(item.pathwayID) ? item.pathwayID.join("; ") : "N/A"; // Renamed
      const pathwayName = Array.isArray(item.pathway) ? item.pathway[0] : "N/A"; // Renamed
      const genes = Array.isArray(item.genes) ? item.genes.join("; ") : "N/A";
  
      csvContent += `"${pathwayID}","${pathwayName}","${genes}"\n`;
    });
  
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `pathway_genes_${selectedTimePoint}.csv`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
  };  

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-bold mb-4">Pathway Gene Data Visualization</h1>

      <div className="mb-4">
        <label htmlFor="timepoint" className="mr-2 font-medium">Select Time Point:</label>
        <select
          id="timepoint"
          value={selectedTimePoint}
          onChange={(e) => setSelectedTimePoint(e.target.value as TimePoint)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timePoints.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={downloadCSV}
        className="px-4 py-2 mb-4 rounded-lg bg-green-500 text-black hover:bg-green-600 transition"
      >
        Download CSV
      </button>

      <div className="plot-container" style={{ width: "100%", height: "100%" }}>
        <Plot
          data={[tableData]}
          layout={{
            title: `Data for ${selectedTimePoint}`,
            autosize: true,
            margin: { t: 50, b: 50, l: 50, r: 50 },
            height: 600,
            width: Math.min(window.innerWidth * 0.9, 1400),
          }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default PathwayApp;