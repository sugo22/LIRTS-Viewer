import React, { useState } from "react";
import geneData from "../data/LIRTS_corrpairs.json"; // Import JSON file
import "./table.css";

// Explicitly assert the type
const typedGeneData: GenePair[] = geneData as GenePair[];

interface GenePair {
  Gene1: string;
  Gene2: string;
  Correlation: number;
}

const GeneTable: React.FC = () => {
  const [search, setSearch] = useState(""); // Input value
  const [filteredData, setFilteredData] = useState<GenePair[] | null>(null); // Stores filtered results

  // Function to filter data when button is clicked
  const handleSearch = () => {
    const results = typedGeneData.filter(
      (item: GenePair) =>
        item.Gene1.toLowerCase().includes(search.toLowerCase()) ||
        item.Gene2.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(results); // Update state with filtered results
  };

  const handleDownload = () => {
    if (!filteredData || filteredData.length === 0) return; // Prevent download if no data
  
    // Ensure the filename is safe by removing special characters
    const safeSearchTerm = search.replace(/[^a-zA-Z0-9_-]/g, "_");
  
    // Generate filename with search term
    const fileName = safeSearchTerm ? `${safeSearchTerm}_gene_correlations.csv` : "gene_correlations.csv";
  
    const header = "Gene1,Gene2,Correlation\n";
    const rows = filteredData
      .map((item) => `${item.Gene1},${item.Gene2},${item.Correlation}`)
      .join("\n");
  
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter gene name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {filteredData && filteredData.length > 0 && (
        <div>
          <button onClick={handleDownload}>Download CSV</button>
          <table>
            <thead>
              <tr>
                <th>Gene 1</th>
                <th>Gene 2</th>
                <th>Correlation</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Gene1}</td>
                  <td>{item.Gene2}</td>
                  <td>{item.Correlation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredData && filteredData.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default GeneTable;