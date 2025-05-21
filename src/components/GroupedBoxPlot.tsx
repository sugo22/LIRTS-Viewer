// src/components/GroupedBoxPlot.tsx
import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface GroupedBoxPlotProps {
  symbol: string;
  description: string;
  data: Data[];
}

const GroupedBoxPlot: React.FC<GroupedBoxPlotProps> = ({
  symbol,
  description,
  data,
}) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>{symbol} - {description}</h3>
      <Plot
        data={data}
        layout={{
          title: `Grouped Expression for ${symbol}`,
          boxmode: "group",
          xaxis: { title: "Time Point" },
          yaxis: { title: "Expression Level" },
        }}
      />
    </div>
  );
};

export default GroupedBoxPlot;