// import React from 'react';

// const pages = [
//     { name: 'TDS Clauter', path: '/tds-clauter' },
//     { name: 'Return', path: '/return' },
//     { name: 'RTO', path: '/rto' },
//     { name: 'High-RTO SKU', path: '/high-rto-sku' },
//     { name: 'Add Product', path: './services/addProduct' },
// ];

// const Sidebar = () => (
//     <aside style={{
//         width: '220px',
//         background: '#f4f4f4',
//         padding: '20px',
//         height: '100vh',
//         boxSizing: 'border-box'
//     }}>
//         <nav>
//             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                 {pages.map(page => (
//                     <li key={page.name} style={{ marginBottom: '18px' }}>
//                         <a
//                             href={page.path}
//                             style={{
//                                 textDecoration: 'none',
//                                 color: '#333',
//                                 fontWeight: '500',
//                                 fontSize: '16px'
//                             }}
//                         >
//                             {page.name}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     </aside>
// );

// export default Sidebar;
import React from "react";

const pages = [
  { name: "Add Product" },
  { name: "TDS Calculator" },
  { name: "Return" },
  { name: "RTO" },
  { name: "High-RTO SKU" },
];

const Sidebar = ({ activeSection, setActiveSection }) => (
  <aside className="w-56 bg-gray-200 p-8 h-screen">
    <nav>
      <ul className="space-y-4">
        {pages.map((page) => (
          <li key={page.name}>
            <button
              onClick={() => setActiveSection(page.name)}
              className={`text-left w-full px-2 py-1 rounded ${
                activeSection === page.name
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              {page.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;