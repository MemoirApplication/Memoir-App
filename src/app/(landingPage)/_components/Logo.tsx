import React from "react";
import Image from "next/image";
import androidchrome from "./android-chrome-512x512.png";

export const Logo = () => {
  return (
    <div>
      <Image src={androidchrome} alt="Logo" width={50} height={50} />
    </div>
  );
};
