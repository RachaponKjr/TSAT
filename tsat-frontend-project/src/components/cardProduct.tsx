import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import api from '@/server/api';
import { Product } from '@/types/product';
export default function CardProduct({ catagoryId }: { catagoryId: string }) {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const getProduct = useCallback(async () => {
    try {
      setLoading(true);
      await api.product.getProduct({ id: catagoryId }).then((res) => {
        const data = res.data as { data: { products: Product[] } };
        setProduct(data.data.products);
      })
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  }, [catagoryId]);

  useEffect(() => {
    void getProduct();
  }, [getProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mb-16'>
      <div className="text-black mx-auto grid md:grid-cols-2 lg:gap-8 px-4 xl:px-60">
        {product.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 lg:gap-12 py-4 md:p-4 border-b border-[#999999] md:border-none"
          >
            <div className='lg:w-[400px] lg:h-[300px] max-w-full max-h-full min-w-[150px] min-h-[150px] relative'>
              <Image
                src={`http://150.95.25.111:3131${item.imageProduct || 'fallback.png'}`}
                alt={item.name || 'product image'}
                fill
                objectFit='cover'
                unoptimized
              />
            </div>
            <div className="text-[#333333] space-y-2">
              <h5 className="text-base md:text-[clamp(18px,1.5vw,24px)] font-semibold">{item.name}</h5>
              <p className="text-sm md:text-[clamp(16px,1.5vw,18px)]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
