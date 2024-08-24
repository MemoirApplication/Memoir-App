import React from "react";
import { useColor } from "@/app/(main)/contexts/ColorContext"; // Adjust the import path as necessary
import { Tooltip } from "@nextui-org/react";

const ColorSwitcher: React.FC = () => {
  const { setColor } = useColor();

  const handleColorChange = (color: string) => {
    setColor(color);
    localStorage.setItem("selectedColor", color); // Save to local storage
  };

  const colorButtons = [
    {
      title: "Rose",
      value: "rose",
      className: "color-button-rose",
    },
    {
      title: "Amber",
      value: "amber",
      className: "color-button-amber",
    },
    {
      title: "Lime",
      value: "lime",
      className: "color-button-lime",
    },
    {
      title: "Teal",
      value: "teal",
      className: "color-button-teal",
    },
    {
      title: "Blue",
      value: "blue",
      className: "color-button-blue",
    },
    {
      title: "Violet",
      value: "violet",
      className: "color-button-violet",
    },
    {
      title: "Neutral",
      value: "neutral",
      className: "color-button-neutral",
    },
  ];

  return (
    <div>
      {colorButtons.map((colorButton) => (
        <Tooltip
          key={colorButton.value}
          placement="bottom"
          showArrow={true}
          content={colorButton.title}
        >
          <button
            className={`color-button ${colorButton.className}`}
            onClick={() => handleColorChange(colorButton.value)}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default ColorSwitcher;
