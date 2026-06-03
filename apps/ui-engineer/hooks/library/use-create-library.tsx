"use client";

import { useState } from "react";
import axios from "@/services/api";
import { showToast } from "@/lib/toast-config";

interface CreateLibraryData {
   libraryName: string;
   libraryDescription: string;
}

interface CreateLibraryResponse {
   message: string;
   data: {
      IDLibrary: string;
      LibraryName: string;
      LibraryDescription: string;
      IsDeleted: number;
   };
}

export function useCreateLibrary(onSuccess?: () => void) {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const createLibrary = async (data: CreateLibraryData) => {
      setIsLoading(true);
      setError(null);

      try {
         const response = await axios.post<CreateLibraryResponse>(
            `${process.env.NEXT_PUBLIC_API_SERVER}/library`,
            {
               libraryName: data.libraryName,
               libraryDescription: data.libraryDescription,
            },
         );

         if (response.status === 201) {
            showToast.success("Tạo library thành công");
            onSuccess?.(); // Call the onSuccess callback
            return response.data.data;
         }
      } catch (error: any) {
         const errorMessage =
            error.response?.data?.message ||
            "Không thể tạo library. Vui lòng thử lại sau.";
         setError(errorMessage);
         showToast.error("Lỗi", errorMessage);
         throw error;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      createLibrary,
      isLoading,
      error,
   };
}
