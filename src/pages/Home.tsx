import { Link } from "react-router-dom";


function Home() {
    return (
        <div className = "home">
            <center>
                <br></br>
            <Link to="/App"><h1>LIRTS Viewer</h1></Link>
            <h2>Graphical visualization tool for gene expression in lens epithelial cells</h2></center>
            <br></br>
            <br></br>
            <div style={{marginLeft:200, marginRight:200}}>
            <h2>What is LIRTS Viewer?</h2>
            <p><br></br>
            The Lens Injury Response Times Series (LIRTS) Viewer is a tool for visualizing the transcriptomic changes that occur in
            mouse lens epithelial cells in response to lens fiber cell removal performed  to model cataract surgery
            (<Link to="https://pubmed.ncbi.nlm.nih.gov/38108456/">O'Neill et al, 2023</Link>).
            Currently, the LIRTS viewer uses data obtained from independent bulk RNAseq analyses performed on 52 lens epithelial cell 
            samples collected at six different time points ranging from  0 hours to 120 hours after lens fiber cell removal. All datasets
            incorporated into the tool have been reanalyzed using the same RNASeq analysis pipeline with reads mapped to mouse genome 
            release version 110. The underlying gene expression values (expressed as Fragments per kilobase million) have been plotted
            against the six time points.<br></br>
            <br></br>
            Following are the mouse-derived datasets used in the LIRTS:<br></br>
            1. 0 vs 6H (<Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE206574">GSE206574</Link>, <Link to="https://pubmed.ncbi.nlm.nih.gov/36359852/"> Novo et al, 2022</Link>) <br></br>
            2. 0 vs 24H (<Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE111430">GSE111430</Link>, <Link to="https://pubmed.ncbi.nlm.nih.gov/30326070/">Jiang et al, 2018 </Link> ; 
                <Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE145492">GSE145492</Link>, <Link to="https://pubmed.ncbi.nlm.nih.gov/34554928/">Shihan et al, 2021</Link>;
                <Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE166619">GSE166619</Link>, <Link to="https://pubmed.ncbi.nlm.nih.gov/34119483/">Faranda et al, 2021</Link>)<br></br>
            3. 0 vs 48H (<Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE119879">GSE119879</Link>, <Link to="https://pubmed.ncbi.nlm.nih.gov/32173580/">Shihan et al, 2020</Link>)<br></br>
            4. 0 vs 72H (<Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE267060">GSE267060</Link>)<br></br>
            5. 0 vs 120H (<Link to="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE266635">GSE266635</Link>)<br></br>
            </p>
            </div>     
    </div>
    );
}


export default Home;