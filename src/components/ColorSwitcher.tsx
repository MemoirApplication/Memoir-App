import React from "react";
import { useColor } from "@/app/(main)/contexts/ColorContext"; // Adjust the import path as necessary
import { Tooltip } from "@nextui-org/react";

const ColorSwitcher: React.FC = () => {
  const { setColor } = useColor();

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <Tooltip placement="bottom" showArrow={true} content="Rose">
        <button
          className="color-button color-button-rose"
          onClick={() => handleColorChange("rose")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Amber">
        <button
          className="color-button color-button-amber"
          onClick={() => handleColorChange("amber")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Lime">
        <button
          className="color-button color-button-lime"
          onClick={() => handleColorChange("lime")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Teal">
        <button
          className="color-button color-button-teal"
          onClick={() => handleColorChange("teal")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Blue">
        <button
          className="color-button color-button-blue"
          onClick={() => handleColorChange("blue")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Violet">
        <button
          className="color-button color-button-violet"
          onClick={() => handleColorChange("violet")}
        />
      </Tooltip>
      <Tooltip placement="bottom" showArrow={true} content="Neutral">
        <button
          className="color-button color-button-neutral"
          onClick={() => handleColorChange("neutral")}
        />
      </Tooltip>
    </div>
  );
};

export default ColorSwitcher;
