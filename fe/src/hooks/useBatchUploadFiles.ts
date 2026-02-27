import { getErrorMessage } from "@/lib/utils";
import { batchUploadFile } from "@/services/uploads/batchUploadFile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseBatchUploadFilesOptions = {
  onSuccess?: (file: File[]) => void;
};

export function useBatchUploadFiles(options?: UseBatchUploadFilesOptions) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: batchUploadFile,
    onError: (err: unknown) => {
      toast.error("Erro ao enviar arquivos", {
        description: getErrorMessage(err),
      });
    },
    onSuccess: (_data, files) => {
      options?.onSuccess?.(files);
    },
  });

  return {
    batchUploadFile: mutateAsync,
    isBatchUploadingFile: isPending,
  };
}
