"use client";

import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Check, Copy, Globe, Share } from "lucide-react";
import { toast } from "sonner";
import { useLocalization } from "../contexts/LocalizationContext";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const { dict } = useLocalization();

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: dict.main.components.Publish.toastPublishLoading,
      success: dict.main.components.Publish.toastPublishSuccess,
      error: dict.main.components.Publish.toastPublishError,
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: dict.main.components.Publish.toastUnpublishLoading,
      success: dict.main.components.Publish.toastUnpublishSuccess,
      error: dict.main.components.Publish.toastUnpublishError,
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover placement="bottom" offset={12} className="w-72">
      <PopoverTrigger>
        <Button variant="light" isIconOnly size="sm">
          <Share size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {initialData.isPublished ? (
          <div className="w-full space-y-4 p-3">
            <div className="flex items-center gap-x-2">
              <Globe className="text-success-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-success-500 select-none">
                {dict.main.components.Publish.pageIsPublished}
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
                isIconOnly={true}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
              radius="sm"
              fullWidth={true}
            >
              {dict.main.components.Publish.unpublish}
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center p-3">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2 select-none">
              {dict.main.components.Publish.publishPopover}
            </p>
            <span className="text-xs text-muted-foreground mb-4 select-none">
              {dict.main.components.Publish.shareWork}
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
              radius="sm"
              fullWidth={true}
            >
              {dict.main.components.Publish.publish}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
