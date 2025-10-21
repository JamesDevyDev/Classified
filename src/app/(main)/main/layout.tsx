import Navbar from "./Navbar";

export default function mainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            <div>
                <Navbar />
            </div>
            {children}
        </div>
    );
}
