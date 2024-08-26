"use client";

import { Link } from "@nextui-org/react";
import { useLocalization } from "@/app/(main)/contexts/LocalizationContext";

export const Footer = () => {
  const { dict } = useLocalization();

  return (
    <div className="mb-0 items-end p-6 z-50">
      <div className="md:justify-end items-center gap-x-2 text-muted-foreground ">
        <Link color="secondary" href="#">
        {dict.landingPage.components.footer.about}
        </Link>
      </div>
    </div>
  );
};
