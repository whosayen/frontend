import MainLayout from "@/components/layouts/MainLayout";
import WalletPage from "@/components/wallet/Wallet";
import React from "react";

export default function Page(){
    return (
        <>
            <MainLayout></MainLayout>
            <WalletPage></WalletPage>
        </>
    )
}