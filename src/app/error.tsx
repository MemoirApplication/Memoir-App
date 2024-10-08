"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useLocalization } from "./(main)/contexts/LocalizationContext";

const Error = () => {
  const router = useRouter();
  const { dict } = useLocalization();

  return (
    <div className="flex items-center justify-center h-full flex-col space-y-4 pt-56">
      <div>
        <Image
          src={"/default-monochrome.svg"}
          height={800}
          width={800}
          alt={"Error"}
          className="mb-6"
        />
      </div>
      <div className="pt-10">
        <h2 className="text-2xl font-medium">{dict.error.errorMessage}</h2>
      </div>
      <div className="pt-6">
        <Button
          color="secondary"
          size="lg"
          onClick={() => {
            router.push("/documents");
          }}
        >
          {dict.error.goBack}
        </Button>
      </div>
    </div>
  );
};

export default Error;
