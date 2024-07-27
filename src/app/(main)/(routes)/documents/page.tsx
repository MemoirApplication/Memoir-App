"use client";

import { Card, CardBody } from "@nextui-org/card";

export default function Documents() {
  return (
    // <div className="flex">
    <div className="select-none h-full min-h-full flex flex-col items-center justify-center space-y-4">
      <Card>
        <CardBody>
          <p>Start a Note</p>
        </CardBody>
      </Card>
    </div>
    /* <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Documents</h1>
        {selectedDocument ? (
          <p>Selected document: {selectedDocument}</p>
        ) : (
          <p>Select a document from the sidebar</p>
        )}
      </main> */
    // </div>
  );
}
