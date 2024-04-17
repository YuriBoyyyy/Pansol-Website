import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  startAfter,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../app-service/firebase-config";
import {
  Residents,
  ResidentsModel,
} from "../dashboard/interfaces/appInterface";

interface Document {
  id: string;
  title: string;
  createdAt: string;
}

interface PaginatedData {
  pages: Document[][];
  pageParams: (number | undefined)[];
}

function usePaginatedData(pageSize: number) {
  const [prevData, setPrevData] = useState();

  const getResidents = (): Promise<ResidentsModel[]> => {
    const collectionRef: CollectionReference = collection(db, "residents");
    let q: Query;
    if (prevData) {
      q = query(
        collectionRef,
        orderBy("name.last_name", "desc"),
        limit(pageSize),
        startAfter(prevData)
      );
    } else {
      q = query(
        collectionRef,
        orderBy("name.last_name", "desc"),
        limit(pageSize)
      );
    }
    return new Promise((resolve) => {
      const data: ResidentsModel[] = [];
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc: DocumentSnapshot) => {
          data.push({
            residentData: doc.data() as Residents,
            id: doc.id,
          });
        });
        resolve(data);
      });
    });
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["residents", prevData],
      queryFn: () => getResidents(),
      keepPreviousData: true,
    });

  console.log(data);
}

export default usePaginatedData;
