import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function Home() {
  const [productList, setProductList] = useState([]);

  const docRef = collection(db, "product_list");

  useEffect(() => {
    loadProductList();
  }, []);

  const loadProductList = async () => {
    try {
      const docSnap = await getDocs(docRef);
      const data = docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProductList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Bevásárlólista</h1>
      <div>
        {productList.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </>
  );
}

export default Home;
