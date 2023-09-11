"use client";

import { Stock } from "@/components/Stock";
import { StockProps } from "@/types";
import fetchWithTimeout from "@/utils/fetchTimeout";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { stock: string } }) => {
  const [data, setData] = useState<StockProps | null>(null);

  useEffect(() => {
    const stock = params.stock;
    const BASE_URL = "https://api-scrape-stocks.onrender.com/";
    // const BASE_URL = "http://localhost:3000/";

    const body = JSON.stringify({ enterprise: stock });

    fetchWithTimeout(BASE_URL, {
      method: "POST",
      body: body,
      timeout: 5 * 60 * 1000,
    })
      .then(async ({ data }) => {
        console.table(data);
        setData(data);
      })
      .catch((e) => console.error(e));
  }, [params]);

  if (!data) {
    return (
      <div className="flex flex-col space-y-4 justify-center sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 px-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 justify-center sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 px-4">
      <Stock {...data} />
    </div>
  );
};

export default Page;
