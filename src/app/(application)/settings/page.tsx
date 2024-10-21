import MainLayout from "@/components/layouts/MainLayout";
import SettingsPage from "@/components/settings/Settings";
import React from "react";

export default function Page(){
    return (
        <>
            <MainLayout></MainLayout>
            <SettingsPage/>
        </>
    )
}