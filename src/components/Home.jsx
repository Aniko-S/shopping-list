import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function Home() {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const { user } = useContext(AuthContext);

  const collectionRef = collection(db, `shopping_list/${user?.uid}/items`);

  useEffect(() => {
    const q = hasFilter
      ? query(collectionRef, where("checked", "==", false))
      : query(collectionRef);

    const getDataUnsub = onSnapshot(
      q,
      (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductList(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => getDataUnsub();
  }, [user, hasFilter]);

  const addProduct = async () => {
    try {
      await addDoc(collectionRef, {
        name: newProduct,
        checked: false,
      });
      setNewProduct("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (event, id) => {
    const docRef = doc(collectionRef, id);
    try {
      await updateDoc(docRef, { checked: event.target.checked });
    } catch (error) {}
  };

  const filterData = (value) => {
    setHasFilter(!hasFilter);
  };

  return (
    <>
      <div className="box letter">
        <h1>Bevásárlólista</h1>
        <input
          type="text"
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Új tétel"
        ></input>
        <button onClick={addProduct}>Hozzáadás</button>
        <div>
          <input
            id="filter"
            type="checkbox"
            onChange={(e) => filterData(e.target.value)}
            className="form-check-input"
          ></input>
          <label htmlFor="filter" className="form-check-label">
            Csak a ki nem jelöltek
          </label>
        </div>
        <div>
          {productList.map((item) => {
            return (
              <div key={item.id}>
                <input
                  id={item.id}
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => updateProduct(e, item.id)}
                  className="form-check-input"
                ></input>
                <label
                  htmlFor={item.id}
                  className={
                    "form-check-label" + (item.checked ? " checked" : "")
                  }
                >
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/">
        <button onClick={() => signOut(auth)}>Kilépés</button>
      </Link>
    </>
  );
}

export default Home;
