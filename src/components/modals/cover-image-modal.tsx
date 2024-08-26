"use client";

import { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { useLocalization } from "@/app/(main)/contexts/LocalizationContext";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const { dict } = useLocalization();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
        // ...
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={coverImage.isOpen}
        onOpenChange={coverImage.onClose}
        backdrop="blur"
        className="bg-opacity-90 backdrop-blur-sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
              {dict.components.modals.coverImage.uploadImage}
              </ModalHeader>
              <ModalBody className="mb-4">
                <SingleImageDropzone
                  className="w-full outline-none"
                  disabled={isSubmitting}
                  value={file}
                  onChange={onChange}
                />
              </ModalBody>
              {/* <ModalFooter /> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
