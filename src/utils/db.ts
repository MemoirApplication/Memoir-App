interface Document{
  _id?: string;
  title: string;
  content: string;
  // TODO: Add other properties as needed
}

declare global {
  interface Window {
    electronAPI: {
      createDocument(documentData: Omit<Document, '_id'>): Promise<Document>;
      getDocuments(): Promise<Document[]>;
      updateDocument(id: string, updateData: Partial<Document>): Promise<number>;
      deleteDocument(id: string): Promise<number>;
    }
  }
}

// TODO: Add other methods as needed
export const createDocument = (documentData: Omit<Document, '_id'>): Promise<Document> => window.electronAPI.createDocument(documentData);

export const getDocuments = (): Promise<Document[]> => window.electronAPI.getDocuments();

export const updateDocument = (id: string, updateData: Partial<Document>): Promise<number> => window.electronAPI.updateDocument(id, updateData);

export const deleteDocument = (id: string): Promise<number> => window.electronAPI.deleteDocument(id);
