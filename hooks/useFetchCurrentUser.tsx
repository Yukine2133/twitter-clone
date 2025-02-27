"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";

import { fetchUser } from "@/actions/user.actions";

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetchUser(user?.id);
      setCurrentUser(res);
    };
    fetchCurrentUser();
  }, [user?.id]);

  return currentUser;
};

export default useFetchCurrentUser;
