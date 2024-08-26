"use client";
import { getProductsByName } from "@/actions/products/getProductsByName";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const params = useSearchParams();
  console.log(params.get("search"));
  useEffect(() => {
    const getServer = async () => {
      let _resp;
      const _param = params.get("search");
      _param && (_resp = await getProductsByName(_param));
      console.log(_resp);
    };
    getServer();
  }, []);

  return <div>{params.get("search")}</div>;
};

export default Page;
