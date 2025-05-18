import React from 'react'
import ProductItem from './product-item'
import { Product } from '@/types/product'

const ShowProduct = ({ product, getProduct }: { product: Product[], getProduct: () => void }) => {
    return (
        <div className='w-full grid grid-cols-6 gap-4'>
            {product.length === 0 ?
                <h1 className='col-span-6 text-center'>ไม่พบสินค้า</h1>
                :
                (
                    product.map((item, index) => (
                        <>
                            <ProductItem key={index} item={item} getProduct={getProduct} />
                        </>
                    ))
                )
            }
        </div>
    )
}

export default ShowProduct