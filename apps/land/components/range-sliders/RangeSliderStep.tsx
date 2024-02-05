"use client";
import React from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const RangeSliderStep = ({
  steps,
  onValueChange = () => null,
  value,
}: {
  steps: number[];
  onValueChange: Function;
  value: number[];
}) => {
  const step = 100 / (steps.length - 1);
  const indexLeft = steps.findIndex((step) => step === value?.[0]);
  const indexRight = steps.findIndex((step) => step === value[1]);
  const finalLeft = Math.round(indexLeft * step);
  const finalRight = Math.round(indexRight * step);

  const themeColor = "#4389FF";
  return (
    <>
      <Slider
        dots
        step={step}
        range
        handleStyle={{
          backgroundColor: themeColor,
          border: "none",
        }}
        trackStyle={{
          backgroundColor: themeColor,
        }}
        activeDotStyle={{
          backgroundColor: themeColor,
          border: "none",
        }}
        value={[finalLeft, finalRight]}
        onChange={(value) => {
          const left = (value as number[])?.[0] || 0;
          const right = (value as number[])[1];
          const leftIndex = left === 0 ? 0 : left / step;
          onValueChange([steps[leftIndex], steps[right / step]]);
        }}
      />
    </>
  );
};

export default RangeSliderStep;
