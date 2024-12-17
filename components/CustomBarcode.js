import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const CustomBarcode = ({ value }) => {
  const barcodeRef = useRef();

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "EAN13", // Формат штрих-кода
        displayValue: false, // Не показывать цифры под штрих-кодом
        width: 2, // Ширина полос
        height: 70, // Высота штрих-кода
 });
    }
  }, [value]);

  return <svg className="w-full !scale-x-[1.7]" ref={barcodeRef}></svg>; // Используем SVG для рендера штрих-кода
};

export default CustomBarcode;