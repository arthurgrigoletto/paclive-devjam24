import { Progress } from 'antd'
import { File } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

type DropzoneProps = {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export function Dropzone({ file, setFile }: DropzoneProps) {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const acceptedFile = acceptedFiles.at(0)
      if (acceptedFile) {
        setFile(
          Object.assign(acceptedFile, {
            preview: URL.createObjectURL(acceptedFile),
          }),
        )
      }
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'text/html': ['.htm', '.html'],
      'image/*': [],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="flex w-full flex-col items-center justify-center gap-4 border border-dashed border-[#d7d7d7] p-6"
    >
      {!file ? (
        <>
          <input {...getInputProps()} />
          <p className="text-sm font-medium text-[#5a5a5a]">
            Drag and drop your file here
          </p>
          <p className="text-xs text-[#5a5a5a]">Or</p>
          <button
            type="button"
            onClick={open}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold text-[#434A54] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Browse and Select Files
          </button>
          <p className="text-xs text-[#5A5A5A]">Supports: .csv, xls, html</p>
        </>
      ) : (
        <div className="flex w-[250px] flex-col items-center justify-center gap-2">
          <File className="size-6 text-[#6A6A6A]" />
          <span className="text-sm font-medium text-[#5a5a5a]">
            {file.name}
          </span>
          <Progress percent={100} status="active" showInfo={false} />
          <span className="self-start text-xs text-[#333333]">
            Upload Complete(100%)
          </span>
        </div>
      )}
    </div>
  )
}
