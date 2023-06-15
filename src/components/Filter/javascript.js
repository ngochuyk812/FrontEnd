export const getCountry = (products)=>{
    const foundCountry = [];
    let brandCount = 0;
    products.forEach(product => {
        if (!foundCountry.includes(product.product_details.land_van_herkomst)) {
            foundCountry.push(product.product_details.land_van_herkomst);
            brandCount++;
        }
    });
    return foundCountry.filter(tmp=>tmp !== undefined)
}
export const getColors = (products)=>{
    const foundColor = [];
    products.forEach(product => {
        let arr = product.quantity_by_featured
        arr.map(tmp=>{
            if (!foundColor.includes(tmp.color)) {
                foundColor.push(tmp.color);
            }
        })

    });
    return foundColor
}
export const filter = (featured, products) =>{
    console.log(featured.search)
    let filterProduct = products.filter(tmp => tmp.title.toLowerCase().includes(featured.search.trim()))
    filterProduct = filterProduct.filter(tmp => tmp.price >= featured.minRange && tmp.price <= featured.maxRange)
    if(featured.category === 'smart')
    filterProduct = filterProduct.filter(tmp =>tmp.title.toLowerCase().includes(featured.category) )
    if(featured.category === 'classic')
    filterProduct = filterProduct.filter(tmp =>!tmp.title.toLowerCase().includes('smart'))
    filterProduct = filterProduct.filter(tmp =>tmp.product_details.land_van_herkomst.includes(featured.country) )
    if(featured.colors.length !== 0 ){
        filterProduct = filterProduct.filter(tmp=>{
            let arr = tmp.quantity_by_featured
            let check = false
            arr.map(tmp2=>{
                featured.colors.map(color=>{
                    if(tmp2.color === color)
                        check = true
                })
            })
            return check
        })
    }

    return filterProduct
}