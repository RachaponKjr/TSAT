import Sidebar from "./_components/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main className="h-screen overflow-hidden">
                    <div className="flex flex-row">
                        <Sidebar />
                        <div className="p-4 h-screen grow overflow-hidden overflow-y-scroll">
                            {children}
                        </div>
                    </div>
                </main>
            </body>
        </html>
    )
}