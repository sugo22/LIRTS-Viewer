// src/components/GroupedBoxPlotWithSearch.tsx
import React, { useState } from "react";
import { Data } from "plotly.js";
import geneExpressionData from "../data/FnKOvsWT_DEG.json";
import GroupedBoxPlot from "../components/GroupedBoxPlot";

interface GeneData {
  SYMBOL: string;
  DESCRIPTION: string;
  [key: string]: string | number;
}

interface Props {
    sampleGroup: string;      // Single experimental group like "FN" or "B8"
    timePoints: string[];     // ["0_hr", "48_hr"]
    replicates: number;       // Usually 3
  }

const FNGroupedBoxPlot: React.FC<Props> = ({
  sampleGroup,
  timePoints,
  replicates,
}) => {
  const data = geneExpressionData as GeneData[];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGene, setSelectedGene] = useState<GeneData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const match = data.find(
      (gene) => gene.SYMBOL.toLowerCase() === searchTerm.toLowerCase()
    );
    if (match) {
      setSelectedGene(match);
      setError("");
    } else {
      setSelectedGene(null);
      setError("No gene found");
    }
  };

  const getGroupedPlotData = (
    gene: GeneData,
    sampleGroup: string,
    timePoints: string[],
    replicates: number
  ): Data[] => {
    const plotData: Data[] = [];
  
    const groups = ["WT", sampleGroup];
  
    for (const group of groups) {
      const allY: number[] = [];
      const allX: string[] = [];
  
      for (const tp of timePoints) {
        for (let i = 1; i <= replicates; i++) {
          const key = `${group}_${tp}_${i}`;
          const val = gene[key];
          if (typeof val === "number") {
            allY.push(val);
            allX.push(tp.replace("_", " "));
          }
        }
      }
  
      plotData.push({
        y: allY,
        x: allX,
        type: "box",
        name: group,
      });
    }
  
    return plotData;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Gene Expression Grouped Box Plot</h2>

      <input
        type="text"
        placeholder="Enter gene name (e.g., Gnai3)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "60%", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {selectedGene && (
        <GroupedBoxPlot
        symbol={selectedGene.SYMBOL}
        description={selectedGene.DESCRIPTION}
        data={getGroupedPlotData(selectedGene, sampleGroup, timePoints, replicates)}
      />
      )}
    </div>
  );
};

export default FNGroupedBoxPlot;