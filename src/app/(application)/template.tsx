import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Template({children} : {children: React.ReactNode}){
    return (
        <div className={'w-full'}>
            <Navbar />
        <div className={'w-full'}>
            <div className={'w-full'}>{children}</div>
            <div className={'mb-8'}> </div>
            <Footer/>
        </div>
        </div>
    );
}