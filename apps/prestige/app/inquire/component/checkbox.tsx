"use client";

import React from "react";
import styled from "styled-components";

export const Checkbox = ({ value, onChange }: any) => {
  return (
    <StyledCheckbox className="">
      <input
        value={value}
        onChange={onChange}
        id="checkbox"
        type="checkbox"
        checked={value}
        className="before: absolute mt-1.5 opacity-0"
      />
      <label htmlFor="checkbox" />
    </StyledCheckbox>
  );
};

const StyledCheckbox = styled.div`
  #checkbox {
    position: absolute; // take it out of document flow
    opacity: 0; // hide it

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
    }

    // Box.
    & + label:before {
      content: "";
      display: inline-block;
      vertical-align: text-top;
      width: 20px;
      height: 20px;
      border: 1px solid #a0672d;
    }

    // Box hover
    &:hover + label:before {
      background: rgba(243, 85, 41, 0.15);
    }

    // Box focus
    &:focus + label:before {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }

    // Box checked
    &:checked + label:before {
      background: #f35429;
    }

    // Disabled state label.
    &:disabled + label {
      color: #b8b8b8;
      cursor: auto;
    }

    // Disabled box.
    &:disabled + label:before {
      box-shadow: none;
      background: #ddd;
    }

    // Checkmark. Could be replaced with an image
    &:checked + label:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 9px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
`;
