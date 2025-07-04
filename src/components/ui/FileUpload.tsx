'use client';

import { UploadCloud, X, File as FileIcon } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';
import { useDropzone, type FileWithPath, type Accept } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  name: string;
  defaultValue?: string | null;
  accept?: Accept;
}

export function FileUpload({ name, defaultValue, accept }: FileUploadProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(defaultValue || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(Date.now());

  useEffect(() => {
    if (defaultValue) {
      setFileUrl(defaultValue);
      // Extract filename from URL
      try {
        const url = new URL(defaultValue);
        const pathParts = url.pathname.split('/');
        setFileName(decodeURIComponent(pathParts[pathParts.length - 1]));
      } catch (e) {
        setFileName(defaultValue);
      }
    } else {
        setFileUrl(null);
        setFileName(null);
    }
  }, [defaultValue]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles?.[0]) {
      if (fileUrl && fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl);
      }
      const newFile = acceptedFiles[0];
      setFileUrl(URL.createObjectURL(newFile));
      setFileName(newFile.name);
    }
  }, [fileUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileUrl && fileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(null);
    setFileName(null);
    setFileKey(Date.now()); // Reset the file input by changing its key
  };
  
  useEffect(() => {
    return () => {
      if (fileUrl && fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <div className="w-full">
      <input {...getInputProps({ name: name, key: fileKey })} />
      {fileUrl && fileUrl === defaultValue && (
        <input type="hidden" name={`${name}_original_url`} value={defaultValue} />
      )}
      
      <div
        {...getRootProps()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors h-40',
          isDragActive ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'
        )}
      >
        {fileUrl ? (
          <>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <FileIcon className="h-10 w-10 text-primary" />
                <p className="font-medium text-foreground break-all">{fileName}</p>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-7 w-7"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="h-10 w-10" />
            <p className="font-medium">
              {isDragActive ? 'Drop file here' : 'Drag & drop file, or click'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
