"use client";

import { UserButton } from "@stackframe/stack";
import {
   BarChart3,
   ClipboardList,
   Menu,
   Package,
   Plus,
   Settings,
   X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
   { name: "DashBoard", href: "/dashboard", icon: BarChart3 },
   { name: "Inventory", href: "/inventory", icon: Package },
   { name: "Add Product", href: "/add-product", icon: Plus },
   { name: "Settings", href: "/settings", icon: Settings },
   { name: "Activity Log", href: "/activity-log", icon: ClipboardList },
];

export default function Sidebar(_props: { currentPath?: string } = {}) {
   const pathname = usePathname();
   const activePath = pathname ?? "";
   const [mobileOpen, setMobileOpen] = useState(false);

   useEffect(() => {
      setMobileOpen(false);
   }, [pathname]);

   const NavLinks = ({ onClick }: { onClick?: () => void }) => (
      <>
         {navigation.map((item, key) => {
            const isActive =
               activePath === item.href || activePath.startsWith(item.href + "/");
            const IconComponent = item.icon;
            return (
               <Link
                  href={item.href}
                  key={key}
                  onClick={onClick}
                  className={`flex items-center space-x-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                     isActive
                        ? "bg-purple-100 text-gray-800"
                        : "hover:bg-gray-800 text-gray-300"
                  }`}
               >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
               </Link>
            );
         })}
      </>
   );

   return (
      <>
         {/* Mobile top bar */}
         <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white px-4 flex items-center justify-between z-30">
            <div className="flex items-center space-x-2">
               <BarChart3 className="w-6 h-6" />
               <span className="text-base font-semibold">Inventory</span>
            </div>
            <button
               aria-label="Toggle navigation"
               onClick={() => setMobileOpen((v) => !v)}
               className="p-2 rounded-lg hover:bg-gray-800"
            >
               {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
         </div>

         {/* Mobile drawer */}
         {mobileOpen && (
            <div
               className="lg:hidden fixed inset-0 bg-black/50 z-20"
               onClick={() => setMobileOpen(false)}
            />
         )}
         <div
            className={`lg:hidden fixed top-14 left-0 right-0 bg-gray-900 text-white p-4 z-30 transform transition-transform duration-200 ${
               mobileOpen ? "translate-y-0" : "-translate-y-[150%]"
            }`}
         >
            <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-1">
               Inventory
            </div>
            <nav className="space-y-1">
               <NavLinks onClick={() => setMobileOpen(false)} />
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-700">
               <UserButton showUserInfo />
            </div>
         </div>

         {/* Desktop sidebar */}
         <div className="hidden lg:block fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
            <div className="mb-8">
               <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-7 h-7" />
                  <span className="text-lg font-semibold">Inventory</span>
               </div>
            </div>
            <nav className="space-y-1">
               <div className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Inventory
               </div>
               <NavLinks />
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
               <div className="flex items-center justify-between">
                  <UserButton showUserInfo />
               </div>
            </div>
         </div>
      </>
   );
}
