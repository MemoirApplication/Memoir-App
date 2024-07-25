import { Block } from "@blocknote/core";
interface Document {
  _id?: string;
  title?: string;
  contentBlocks?: {
    _id?: number;
    block: 
  };

  // Add other fields as needed
}

declare global {
  interface Window {
    electronAPI?: {
      createDocument(documentData: Omit<Document, '_id'>): Promise<Document>;
      getDocuments(): Promise<Document[]>;
      updateDocument(id: string, updateData: Partial<Document>): Promise<number>;
      deleteDocument(id: string): Promise<number>;
    }
  }
}

export const createDocument = (documentData: Omit<Document, '_id'>): Promise<Document> => {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI.createDocument(documentData);
  }
  throw new Error('Electron API is not available');
};

export const getDocuments = (): Promise<Document[]> => {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI.getDocuments();
  }
  throw new Error('Electron API is not available');
};

export const updateDocument = (id: string, updateData: Partial<Document>): Promise<number> => {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI.updateDocument(id, updateData);
  }
  throw new Error('Electron API is not available');
};

export const deleteDocument = (id: string): Promise<number> => {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI.deleteDocument(id);
  }
  throw new Error('Electron API is not available');
};