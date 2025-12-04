import { db } from "./config/firebase";
import ShoppingList from "./components/ShoppingList";
import Auth from "./components/Auth";
import "./App.css";
import "./style.css";
import { useState, useEffect } from "react";

// db-hez
import {
  collection, // ez mindenféleképp kell
  getDocs, // lista lekéréséhez
  addDoc, // új létrehozása
  doc, // egy sor lekérése id alapján (kell a törléshez és a módosításhoz)
  deleteDoc, // törlés
  updateDoc, // módosítás
} from "firebase/firestore";

function App() {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [typeOfStore, setTypeOfStore] = useState("");
  const [isSOS, setIsSOS] = useState(false);
  const [updatedTypeOfStore, setUpdatedTypeOfStore] = useState();

  // db-hez. "product_list" a név, ahogy elneveztük a táblázatot firebase-ben
  const productListCollectionRef = collection(db, "product_list");

  const getProductList = async () => {
    try {
      const data = await getDocs(productListCollectionRef);
      const dataArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProductList(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const onSubmit = async () => {
    try {
      await addDoc(productListCollectionRef, {
        name: productName,
        type_of_store: typeOfStore,
        isSOS: isSOS,
      });

      getProductList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "product_list", id);
    await deleteDoc(productDoc);
    getProductList();
  };

  const updateTypeOfStore = async (id) => {
    const productDoc = doc(db, "product_list", id);
    await updateDoc(productDoc, { type_of_store: updatedTypeOfStore });
    getProductList();
  };

  return (
    <>
      <Auth></Auth>
      <div>
        <input
          placeholder="Termék"
          onChange={(e) => setProductName(e.target.value)}
        ></input>
        <input
          placeholder="Lelőhely"
          onChange={(e) => setTypeOfStore(e.target.value)}
        ></input>
        <input
          type="checkbox"
          checked={isSOS}
          onChange={(e) => setIsSOS(e.target.checked)}
        ></input>
        <label>Sürgős</label>
        <button onClick={onSubmit}>Mentés</button>
      </div>

      <div>
        {productList.map((product) => {
          return (
            <div key={product.id}>
              <span>
                {product.name}, {product.type_of_store}
              </span>
              <button onClick={() => deleteProduct(product.id)}>Törlés</button>
              <input
                placeholder="Új lelőhely"
                onChange={(e) => setUpdatedTypeOfStore(e.target.value)}
              ></input>
              <button onClick={() => updateTypeOfStore(product.id)}>
                Mentés
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
