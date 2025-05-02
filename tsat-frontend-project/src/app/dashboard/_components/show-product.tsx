import React from 'react'
import ProductItem from './product-item'

const ShowProduct = () => {
    return (
        <div className='w-full  grid grid-cols-6 gap-4'>
            {Array.from({ length: 18 }).map((_, index) => (
                <>
                    <ProductItem key={index} />
                </>
            ))}
        </div>
    )
}

export default ShowProduct