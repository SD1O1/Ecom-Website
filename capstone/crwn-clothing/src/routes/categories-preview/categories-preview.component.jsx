import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
    // const {categoriesMap}= useContext(CategoriesContext);
    const categoriesMap=useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map((title)=>{
          {/*<Fragment key={title}>
            <h2>{title}</h2>
            <div className='products-container'> 
                {categoriesMap[title].map((product)=>(
                <ProductCard key={product.id} product={product}/>
               ))}
            </div>
                </Fragment> */}
           const products=categoriesMap[title];    
           return <CategoryPreview key={title} title={title} products={products}/>
        })}
    </Fragment>
  );
};
export default CategoriesPreview;
