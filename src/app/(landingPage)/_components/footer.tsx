"use client";
import React from 'react';
import { Link } from "@nextui-org/react";

export const Footer = () => {
  return (
    <div className="mb-0 items-end p-6 z-50">
      <div className="md:justify-end items-center gap-x-2 text-muted-foreground items-end">
        <Link color="secondary" href="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default Footer;
