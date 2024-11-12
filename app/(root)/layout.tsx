import Navbar from "@/components/Navbar";

export default function Layout({children}:Readonly<{children:React.ReacNode}>){
    return (
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    )
}