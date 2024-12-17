"use client"
import React, { useEffect, useState } from 'react';
import handleFileChange from '@/utils/handleFileChange';
import { useData } from '@/context/DataContext';
import { CustomBarcode } from '@/components';

function UploadForm() {
  const { data, setData } = useData();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setSelectedRows(selectedOptions);
  };

  const handleSelectAll = () => {
    setSelectedRows(data.map((_, index) => index + 1));
  };

  const handleClearAll = () => {
    setSelectedRows([]);
  };

  const selectedData = data.filter((_, index) => selectedRows.includes(index + 1));
  useEffect(() => {
    // console.log(data);
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="form flex items-center justify-center w-full  min-h-[100vh]">
        <div className=" p-8 rounded  max-w-md  ">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Label File</h2>
          <input
            type="file"
            accept=".xlsx,.xml"
            onChange={(e) => handleFileChange(e, setData)}
            className="mb-4 w-full border border-gray-300 p-2 rounded"
          />
          {data.length > 0 && (

            <select multiple className="mb-4 w-full border border-gray-300 p-2 rounded" value={selectedRows} onChange={handleSelect}>
              {data.map((row, index) => (
                <option key={index} value={index + 1}>{index + 1}</option>
              ))}

            </select>
          )}
          {data.length > 0 && (
            <div className="flex justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSelectAll}>
                Select All
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClearAll}>
                Clear Selected
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrint}>
                Print
              </button>
            </div>
          )}
        </div>
      </div>
      {data.length > 0 && (
        <>
          {selectedData.map((item, index) => (
            <div key={index} className="label overflow-hidden w-[10cm] h-[10cm] mb-4 p-2 border border-gray-300 rounded">
              <div className="line-clamp-1 font-bold text-center mb-1">{item[4]}</div>
              <div className="flex justify-between mb-1">
                <div>{item[6]}</div>
                <div>{item[7]}</div>
              </div>
              <div className=" line-clamp-1 font-bold text-center  mb-1">{item[8]}</div>
              <div className=" text-center  ">{item[9]}</div>
              <CustomBarcode value={item[9]} />
              <div className="flex justify-between mb-1">
                <div>{item[0]}</div>
                <div>{item[2]}</div>
              </div>

              <div className=" text-center  ">{item[3]}</div>
              <CustomBarcode value={item[3]} />

            </div>
          ))}
        </>
      )}
    </>

  );
}

export default UploadForm;