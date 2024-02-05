"use client";
import { useEffect, useState } from "react";
import md5 from "md5";

export interface TokenMap {
  token: string;
  value: any;
}

export const useLocalStorage = () => {
  const [tokenMaps, setTokenMaps] = useState<TokenMap[]>([]);

  const setTokenValue = (value: any) => {
    const str = JSON.stringify(value);
    const token = md5(str);
    const index = tokenMaps.findIndex((item) => item.token == token);
    if (index > -1) tokenMaps.splice(index, 1);
    tokenMaps.push({
      token,
      value: str,
    });
    setTokenMaps([...tokenMaps]);
    window.localStorage.setItem("token-map", JSON.stringify(tokenMaps));
    return token;
  };

  const getTokenValue = (token: string | null) => {
    try {
      const exist: TokenMap[] = JSON.parse(
        window.localStorage.getItem("token-map") || "[]"
      );
      return JSON.parse(exist.find((item) => item.token == token)?.value);
    } catch (error) {
      return "";
    }
  };

  const loadExistTokenValues = () => {
    try {
      const exist: TokenMap[] = JSON.parse(
        window.localStorage.getItem("token-map") || "[]"
      );
      exist.map((tokenMap) => {
        tokenMaps.push(tokenMap);
      });
      setTokenMaps([...tokenMaps]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadExistTokenValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getTokenValue,
    setTokenValue,
    tokenMaps,
  };
};
