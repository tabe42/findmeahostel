import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ItemBar } from "../components/ItemBar";

export const MyListings = ({ isAuth }) => {
  const [productList, setProductList] = useState([]);
  const [randstate, setRandstate] = useState(0);

  const productCollectionRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      console.log("hi", data);
      setProductList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [randstate]);

  const filteredproductList = productList.filter((product) => {
    return product.seller.id === auth.currentUser.uid;
  });
  const deleteProduct = async (pid) => {
    const productDoc = doc(db, "products", pid);
    const docSnap = await getDoc(productDoc);
    console.log("snapshot is", docSnap.data());
    const tobedeletedname = docSnap.data().imagename;
    console.log("name to be deleted", tobedeletedname);

    // console.log("deleted doc:", productDoc);

    await deleteDoc(productDoc);
    const imagereference = ref(storage, `images/${tobedeletedname}`);
    // Delete the file
    deleteObject(imagereference)
      .then(() => {
        console.log("image deleted from firebase");
      })
      .catch((error) => {
        console.log(error);
      });
    setRandstate(randstate + 1);
  };

  return (
    <div className=" flex-col justify-center items-center space-y-4 mt-4 block">
      {filteredproductList.map((product) => {
        return (
          <ItemBar
            key={product.id}
            productname={product.productname}
            contact={product.contact}
            description={product.description}
            price={product.price}
            name={product.seller.name}
            imageurl={product.imageurl}
            id={product.id}
            deleteProduct={deleteProduct}
            productsellerid={product.seller.id}
            isAuth={isAuth}
          />
        );
      })}
    </div>
  );
};
