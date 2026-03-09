"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const Protected = ({ children }: Props) => {
    const { userData } = useContext(AuthContext);

    if (!userData) return null;

    return<>{children}</>
};

export default Protected