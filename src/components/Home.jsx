import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function Home() {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const { user } = useContext(AuthContext);

  const collectionRef = collection(db, `shopping_list/${user?.uid}/items`);

  useEffect(() => {
    const q = query(collectionRef);
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
  }, [user]);

  const addProduct = async () => {
    try {
      await addDoc(collectionRef, { name: newProduct });
      setNewProduct("");
    } catch (error) {
      console.log(error);
    }
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
          {productList.map((item) => {
            return <div key={item.id}>{item.name}</div>;
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
