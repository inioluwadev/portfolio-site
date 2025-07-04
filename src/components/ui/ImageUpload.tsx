'use client';

import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState, useEffect } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  name: string;
  defaultValue?: string | null;
}

export function ImageUpload({ name, defaultValue }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [fileKey, setFileKey] = useState(Date.now());

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles?.[0]) {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFileKey(Date.now()); // Reset the file input by changing its key
  };
  
  useEffect(() => {
    // This is a cleanup function that will run when the component is unmounted.
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full">
      <input {...getInputProps({ name: name, key: fileKey })} />
      {/* Hidden input to track the original URL. If this is submitted, it means the image wasn't changed. */}
      {preview && preview === defaultValue && (
        <input type="hidden" name={`${name}_original_url`} value={defaultValue} />
      )}
      
      <div
        {...getRootProps()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors h-40',
          isDragActive ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'
        )}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Image preview"
              fill
              className="rounded-md object-contain"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-7 w-7"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="h-10 w-10" />
            <p className="font-medium">
              {isDragActive ? 'Drop file here' : 'Drag & drop image, or click'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
