'use client';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Tabs from './tabs';
import CardProduct from './cardProduct';
import api from '@/server/api';
import { CatagoryProduct } from '@/app/page';
import { useSearchParams } from 'next/navigation';

export default function TabMenu() {
  const [menu, setMenu] = useState<CatagoryProduct[]>([]);
  const searchParams = useSearchParams();
  const index = searchParams.get('index');
  const menuCatagory = useCallback(async () => {
    try {
      await api.product.getCatagoryProduct().then((res) => {
        const data = res.data.data as unknown as CatagoryProduct[];
        setMenu(data);
      })
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    void menuCatagory();
  }, [menuCatagory]);

  const tabs = menu.map((item, index) => ({
    id: `tab${index + 1}`,
    label: item.name,
    content: <CardProduct catagoryId={item.id} />,
  }));

  return (
      <div className="mt-10 container mx-auto">
        {tabs.length > 0 ? <Tabs tabs={tabs} defaultActive={index ? parseInt(index, 10) || 0 : 0} /> : <div>loading...</div>}
      </div>
  );
}
