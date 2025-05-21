import { useState,Suspense, lazy } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Heatmap from './Heatmap'
import EnrichmentApp from "./GOenrichtable";
import GeneTable from "./Genetable";
import PathwayApp from "./KEGGpathway";

const WTGraph = lazy(() => import("./WTGraph"));
//const FNGraph = lazy(() => import("./FNGraph"));
function Loading() {
  return <center><h1>🌀 Loading...</h1></center>;
}

// Define tab panel component
const TabPanel = ({ value, index, children }: { value: number; index: number; children: React.ReactNode }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box p={3}><Typography>{children}</Typography></Box>}
    </div>
  );
};

const MaterialTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 2, borderRadius: 2, boxShadow: 3 }}>
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Expression Graph" />
        <Tab label="Coexpression" />
        <Tab label="Heatmap" />
        <Tab label="GO Enrichment" />
        <Tab label="KEGG Pathway" />
        {/*<Tab label="Mutants" />*/}
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Suspense fallback={<Loading />}><WTGraph/></Suspense>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <GeneTable />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Heatmap />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <EnrichmentApp />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <PathwayApp />
      </TabPanel>
      {/*<TabPanel value={activeTab} index={5}>
      <Suspense fallback={<Loading />}>
      <FNGraph sampleGroup="FN" timePoints={["0_hr", "48_hr"]} replicates={3}/></Suspense>
      </TabPanel>*/}
    </Box>
  );
};

export default MaterialTabs;