/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeaderTop from "./_components/header-top";
import ShowProduct from "./_components/show-product";
import api from "@/server/api";
import { Product } from "@/types/product";

const page = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [productFilter, setProductFilter] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("");
  const getProduct = useCallback(async () => {
    try {
      const res = await api.product.getAllProduct();
      if (res.status === 200) {
        setProduct(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    void getProduct();
  }, [getProduct]);

  useEffect(() => {
    if (filter === "all") return setProductFilter(product);
    const filterProduct = product.filter(
      (item) => item.category?.name === filter
    );
    setProductFilter(filterProduct);
  }, [filter, product]);

  return (
    <div className="space-y-4">
      <HeaderTop getProduct={getProduct} setFilter={setFilter} />
      <ShowProduct
        product={filter === "" ? product : productFilter}
        getProduct={getProduct}
      />
    </div>
  );
};

export default page;
