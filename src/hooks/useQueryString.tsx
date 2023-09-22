import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryString = () => {
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};

export default useQueryString;
