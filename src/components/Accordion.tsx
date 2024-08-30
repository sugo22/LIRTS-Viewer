import { useEffect, useRef, useState, ReactNode } from 'react';
import '../components/Accordion.css'

type AccordionData = {
  title: string;
  content: ReactNode;
};

const accordionItems = [
  {
    title: 'Search for your desired gene',
    content: (
      <div>
        Use the empty search box labelled "Search gene of interest" to enter the official gene symbol you would like to search. Click 
        the blue "Update" button and the data from your selected gene will populate the graph. 
      </div>
    ),
  },
  {
    title: 'Switch graph options',
    content: (
      <div>
        Please use the dropdown box, located beside the button to switch among Boxplot, Scatterplot and a combination of 
        box&scatter plot options.
      </div>
    ),
  },
  {
    title: 'Scaling the X and Y axis',
    content: (
      <div>
        To scale the X or Y axis, please click and drag <strong>above or below</strong> for the Y axis
        and to the <strong>left or right</strong> for the X axis. If you click directly on either axis,
        you will scroll through the graph and the axes will not be scaled. Use the autoscale button in
        the top right corner of the graph to reset the graph after scaling.
      </div>
    ),
  },
  {
    title: 'View table of FPKM values for your gene of interest',
    content: (
      <div>
        After you search for a gene, a table containing the FPKM values at each time point is available to see. Scroll down to see it.
      </div>
    ),
  },
  {
    title: 'Downloading images of your graph',
    content: (
      <div>
        Use the camera button on the top right corner of the graph to download an image of it. It will prompt a download window and this
        image will save in the svg format.
      </div>
    ),
  },
];
function Accordion() {
    const [currentIdx, setCurrentIdx] = useState(-1);
    const btnOnClick = (idx: number) => {
        setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
      };
  
    return (
      <ul className="accordion">
        {accordionItems.map((accordionItems, idx) => (
          <AccordionItem
            key={idx}
            data={accordionItems}
            isOpen={idx === currentIdx}
            btnOnClick={() => btnOnClick(idx)}
          />
        ))}
      </ul>
    );
  }
  function AccordionItem({
    data,
    isOpen,
    btnOnClick,
  }: {
    data: AccordionData;
    isOpen: boolean;
    btnOnClick: () => void;
  }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (isOpen) {
        const contentEl = contentRef.current as HTMLDivElement;
  
        setHeight(contentEl.scrollHeight);
      } else {
        setHeight(0);
      }
    }, [isOpen]);
  
    return (
      <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
        <h2 className="accordion-item-title">
          <button className="accordion-item-btn" onClick={btnOnClick}>
            {data.title}
          </button>
        </h2>
        <div className="accordion-item-container" style={{ height }}>
          <div ref={contentRef} className="accordion-item-content">
            {data.content}
          </div>
        </div>
      </li>
    );
  }

export default Accordion;