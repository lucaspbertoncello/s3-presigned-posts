import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiUploadCloud2Line } from "@remixicon/react";
import { cn, bytesToMb } from "@/lib/utils";
import { Button } from "@/components/common/button";
import { UploadSuccessOverlay } from "@/components/custom/upload-success-overlay";
import { useBatchUploadFiles } from "./hooks/useBatchUploadFiles";

export function App() {
  const [file, setFile] = useState<File[]>();
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => acceptedFiles && setFile(acceptedFiles),
    multiple: true,
  });

  const { batchUploadFile, isBatchUploadingFile } = useBatchUploadFiles({
    onSuccess: () => setShowSuccessOverlay(true),
  });

  useEffect(() => {
    if (!showSuccessOverlay) return;
    const timer = setTimeout(() => setShowSuccessOverlay(false), 2500);
    return () => clearTimeout(timer);
  }, [showSuccessOverlay]);

  async function handleFileUpload() {
    if (!file) return;

    await batchUploadFile(file);
    setFile(undefined);
  }

  return (
    <>
      <UploadSuccessOverlay show={showSuccessOverlay} />
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex w-full max-w-xl flex-col gap-4">
          {/* área de drop - clicável e arrastável */}
          <div
            {...getRootProps({
              className: cn(
                "flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all duration-200 ease-out",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                !isDragActive && "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50",
                isDragActive && "border-primary bg-primary/5 scale-[1.02]",
              ),
            })}
          >
            <input {...getInputProps()} />

            <div
              className={cn(
                "bg-primary/10 rounded-full p-4 transition-all duration-200",
                isDragActive && "bg-primary/20 scale-110",
              )}
            >
              <RiUploadCloud2Line className="text-primary size-10" />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-foreground text-sm font-medium">
                {isDragActive ? (
                  <>Solte os arquivos aqui</>
                ) : file && file.length > 0 ? (
                  <>{file.length === 1 ? file[0].name : `${file.length} arquivo(s) selecionado(s)`}</>
                ) : (
                  <>Arraste arquivos ou clique para selecionar</>
                )}
              </p>
              {/* mostra tamanho em MB quando tem arquivo(s) */}
              {file && file.length > 0 && (
                <p className="text-muted-foreground text-xs">
                  {bytesToMb(file.reduce((acc, f) => acc + f.size, 0))}
                </p>
              )}
              {(!file || file.length === 0) && !isDragActive && (
                <p className="text-muted-foreground text-xs">Múltiplos arquivos permitidos</p>
              )}
            </div>
          </div>

          {/* botões de ação - só aparecem quando tem arquivo(s) */}
          {file && file.length > 0 && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setFile(undefined)}>
                Remover
              </Button>

              <Button onClick={handleFileUpload} isLoading={isBatchUploadingFile}>
                Enviar
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
