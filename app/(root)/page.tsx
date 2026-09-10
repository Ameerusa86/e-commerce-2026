import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/sample-data/sample-data/db/sample-data";

export const metadata = {
  title: "Home",
};

const HomePage = () => {
  return (<ProductList data={sampleData.products}/>)
};

export default HomePage;
