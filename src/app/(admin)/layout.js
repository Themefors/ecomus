import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import "./admin.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar */}
        <div className="w-64 fixed top-0 left-0 h-screen border-r">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64 overflow-y-auto h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
