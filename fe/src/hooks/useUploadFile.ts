import { getErrorMessage } from "@/lib/utils";
import { uploadFile } from "@/services/uploadFile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseUploadFileOptions = {
  onSuccess?: (file: File) => void;
};

export function useUploadFile(options?: UseUploadFileOptions) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: uploadFile,
    onError: (err: unknown) => {
      toast.error("Erro ao enviar arquivo", {
        description: getErrorMessage(err),
      });
    },
    onSuccess: (_data, file) => {
      options?.onSuccess?.(file);
    },
  });

  return {
    uploadFile: mutateAsync,
    isUploadingFile: isPending,
  };
}
